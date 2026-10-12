# Builds the small, metadata-free photo copies used by the v2 homepage prototypes.
# Reads the local originals (never modifies them) and writes JPEGs to ./photos (git-ignored).
# Usage (from the repo root):
#   powershell -ExecutionPolicy Bypass -File explorations/v2-homepage/make-photos.ps1
param(
  [string]$Src = (Join-Path $PSScriptRoot '..\..\originals'),
  [string]$Out = (Join-Path $PSScriptRoot 'photos'),
  [int]$LongEdge = 1400
)
Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force $Out | Out-Null

# Inventory numbers refer to docs/research/v2-photography-inventory.md.
# Crop values are fractions of the upright (EXIF-rotated) image: x, y, width, height.
$photos = @(
  @{ n = 24; src = 'taco_soup_mexican.jpg';                    out = 'shell-pasta-soup-with-rolled-tacos.jpg';    crop = @(0, 0, 1, 1) },
  @{ n = 20; src = 'Steak_bites.jpg';                          out = 'steak-bites-mashed-potatoes-close-up.jpg'; crop = @(0, 0, 1, 1) },
  @{ n = 14; src = 'Meal_prep_beef_potatoes_peppers_rice.jpg'; out = 'meal-prep-beef-potatoes-peppers-rice.jpg'; crop = @(0, 0.05, 1, 0.95) },
  @{ n = 27; src = 'Tamales_making_2.jpg';                     out = 'tamale-assembly-close.jpg';                crop = @(0, 0, 1, 0.56) },  # stops above the mat's brand name
  @{ n = 25; src = 'Tamales_in_pot.jpg';                       out = 'tamales-in-steamer-pot.jpg';               crop = @(0.22, 0.2, 0.58, 0.55) },  # excludes branded boxes and mitt
  @{ n = 28; src = 'Valentines_Cake.jpg';                      out = 'heart-red-velvet-cake-xoxo.jpg';           crop = @(0, 0.22, 1, 0.78) },  # excludes shelf and tumbler
  @{ n = 5;  src = 'Califlour_nuggets.jpg';                    out = 'breaded-cauliflower-bites-marinara.jpg';   crop = @(0.08, 0, 0.84, 1) }
)

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 78L

foreach ($p in $photos) {
  $img = [System.Drawing.Image]::FromFile((Join-Path $Src $p.src))
  try {
    if ($img.PropertyIdList -contains 0x0112) {
      switch ([BitConverter]::ToUInt16($img.GetPropertyItem(0x0112).Value, 0)) {
        3 { $img.RotateFlip('Rotate180FlipNone') } 6 { $img.RotateFlip('Rotate90FlipNone') } 8 { $img.RotateFlip('Rotate270FlipNone') }
      }
    }
    $c = $p.crop
    $rect = New-Object System.Drawing.Rectangle ([int]($c[0] * $img.Width)), ([int]($c[1] * $img.Height)), ([int]($c[2] * $img.Width)), ([int]($c[3] * $img.Height))
    $scale = [Math]::Min(1.0, $LongEdge / [Math]::Max($rect.Width, $rect.Height))
    $w = [int]($rect.Width * $scale); $h = [int]($rect.Height * $scale)
    # A new Bitmap carries no EXIF, so GPS and camera metadata are not copied
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $path = Join-Path $Out $p.out
    $bmp.Save($path, $jpeg, $params); $bmp.Dispose()
    '{0,2}  {1}  {2}x{3}  {4} KB' -f $p.n, $p.out, $w, $h, [int]((Get-Item $path).Length / 1KB)
  } finally { $img.Dispose() }
}
