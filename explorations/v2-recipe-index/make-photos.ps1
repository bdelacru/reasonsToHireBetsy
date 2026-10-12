# Builds resized, metadata-free photo copies for the recipe-index navigation prototype.
# Reads Betsy's originals in ../../originals, plus one repo screenshot (never modifies either), and writes JPEGs to ./photos (git-ignored).
# Some outputs are cropped copies, to remove clutter, price signs or another person; the originals stay untouched.
# Usage (from the repo root):
#   powershell -ExecutionPolicy Bypass -File explorations/v2-recipe-index/make-photos.ps1
param(
  [string]$Src = (Join-Path $PSScriptRoot '..\..\originals'),
  [string]$Out = (Join-Path $PSScriptRoot 'photos'),
  [string[]]$Only   # optional output names, e.g. -Only tres-leches, to rebuild just those
)
Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force $Out | Out-Null

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 76L

# Crop boxes are fractions of the displayed (EXIF-rotated) frame: x, y, width, height.
# One output per page, in story order: prepare, separate, build, test, share.
# No width is larger than the cropped source, so nothing is upscaled.
$jobs = @(
  # Home: the empty prep table, full frame (same output as the v2-homepage-prep prototype).
  @{ File = 'cooking_prep.jpg';            Name = 'cooking-prep';      Crop = @(0, 0, 1, 1);            Widths = @(1740, 1200, 800) },
  # Experience: eggs separated, flour and whisk. Right edge cropped to remove personal items and packaging.
  # The original is only 979 px wide, so the largest copy is 822 px.
  @{ File = 'cooking_prep_2.jpg';          Name = 'separating-eggs';   Crop = @(0, 0, .84, 1);          Widths = @(822, 560) },
  # Projects: the finished tres leches sponge in its glass dish, milk mixture and whisk above. Full frame, native width.
  @{ File = 'TresLechesSpongeMilk.jpg';    Name = 'tres-leches';       Crop = @(0, 0, 1, 1);            Widths = @(1079, 800, 560) },
  # AI & Learning: the sponge poked all over in rows of fork holes. Full frame.
  @{ File = 'TresLechsForkCake.jpg';       Name = 'fork-cake';         Crop = @(0, 0, 1, 1);            Widths = @(1600, 1100, 700) },
  # About, two crops of the same photo to compare (neither is the approved default yet):
  # behind the table (shown by default for now). Cropped above the price signs and left of a second person's hand.
  @{ File = 'flab_tres_leches_sale.jpg';   Name = 'behind-sale-table'; Crop = @(0, 0, .94, .85);        Widths = @(1300, 900, 640) },
  # portrait (?about=portrait): Betsy from head to hands, 4:5.
  @{ File = 'flab_tres_leches_sale.jpg';   Name = 'betsy-portrait';    Crop = @(.18, .06, .60, .56);    Widths = @(1300, 900, 640) },
  # Projects card: screenshot of the first Magic 8-Ball site (April 2025), from the repo's README image (read only).
  @{ From = '..\..\frontend\src\assets\websiteSample.png'; Name = 'magic-8-ball-2025'; Crop = @(0, .01, 1, .99); Widths = @(1200, 800) },
  # Projects card (v2.0): this prototype's own Home screenshot. Take the screenshots first (screenshots/ is git-ignored).
  @{ From = 'screenshots\desktop-home-1440x900.png'; Name = 'site-v2-home'; Crop = @(0, 0, 1, 1); Widths = @(1000, 640) }
)

foreach ($job in $jobs) {
  if ($Only -and $Only -notcontains $job.Name) { continue }
  $source = if ($job.From) { Join-Path $PSScriptRoot $job.From } else { Join-Path $Src $job.File }
  $img = [System.Drawing.Image]::FromFile((Resolve-Path $source))
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
