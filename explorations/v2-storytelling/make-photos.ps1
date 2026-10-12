# Builds resized, metadata-free photo copies for the storytelling prototype.
# Reads Betsy's originals in ../../originals (never modifies them) and writes JPEGs to ./photos (git-ignored).
# Some outputs are cropped copies, to remove clutter, price signs or the edge of a person; the originals stay untouched.
# Usage (from the repo root):
#   powershell -ExecutionPolicy Bypass -File explorations/v2-storytelling/make-photos.ps1
param(
  [string]$Src = (Join-Path $PSScriptRoot '..\..\originals'),
  [string]$Out = (Join-Path $PSScriptRoot 'photos')
)
Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force $Out | Out-Null

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 76L

# Crop boxes are fractions of the displayed (EXIF-rotated) frame: x, y, width, height.
$jobs = @(
  # Preparation: the hero photo, full frame (same output as the v2-homepage-prep prototype)
  @{ File = 'cooking_prep.jpg';           Name = 'cooking-prep';        Crop = @(0, 0, 1, 1);              Widths = @(1740, 1200, 800) },
  # Process, 22:33: eggs separated. Right edge cropped to remove personal items and packaging.
  @{ File = 'cooking_prep_2.jpg';         Name = 'separating-eggs';     Crop = @(0, 0, .84, 1);            Widths = @(820, 560) },
  # Process, 23:02: the same three bowls, filled. Full frame.
  @{ File = 'cooking_prep_3.jpg';         Name = 'mixing-bowls';        Crop = @(0, 0, 1, 1);              Widths = @(1740, 1200, 800) },
  # Result: sale table without the person. Cropped above the price signs and left of the figure at the top right.
  @{ File = 'Flan_tres_leches sale.jpg';  Name = 'sale-table';          Crop = @(0, .03, .91, .63);        Widths = @(2000, 1400, 800) },
  # Result, narrow screens: the tres leches pans only.
  @{ File = 'Flan_tres_leches sale.jpg';  Name = 'sale-tres-leches';    Crop = @(.55, .17, .35, .49);      Widths = @(1000, 640) }
)

foreach ($job in $jobs) {
  $img = [System.Drawing.Image]::FromFile((Resolve-Path (Join-Path $Src $job.File)))
  try {
    if ($img.PropertyIdList -contains 0x0112) {
      switch ([BitConverter]::ToUInt16($img.GetPropertyItem(0x0112).Value, 0)) {
        3 { $img.RotateFlip('Rotate180FlipNone') } 6 { $img.RotateFlip('Rotate90FlipNone') } 8 { $img.RotateFlip('Rotate270FlipNone') }
      }
    }
    $c = $job.Crop
    $srcRect = New-Object System.Drawing.Rectangle ([int]($c[0] * $img.Width)), ([int]($c[1] * $img.Height)), ([int]($c[2] * $img.Width)), ([int]($c[3] * $img.Height))
    foreach ($w in $job.Widths) {
      $w = [Math]::Min($w, $srcRect.Width)
      $h = [int]($srcRect.Height * $w / $srcRect.Width)
      # A new Bitmap carries no EXIF, so no camera or location metadata is copied
      $bmp = New-Object System.Drawing.Bitmap $w, $h
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      $g.InterpolationMode = 'HighQualityBicubic'
      $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), $srcRect, 'Pixel')
      $g.Dispose()
      $path = Join-Path $Out "$($job.Name)-$w.jpg"
      $bmp.Save($path, $jpeg, $params); $bmp.Dispose()
      '{0}  {1}x{2}  {3} KB' -f (Split-Path $path -Leaf), $w, $h, [int]((Get-Item $path).Length / 1KB)
    }
  } finally { $img.Dispose() }
}
