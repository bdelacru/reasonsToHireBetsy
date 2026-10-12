# Builds the resized, metadata-free hero copies for the "prep table" homepage prototype.
# Reads originals/cooking_prep.jpg (never modifies it) and writes JPEGs to ./photos (git-ignored).
# No cropping or retouching: every width is the full, unedited frame.
# Usage (from the repo root):
#   powershell -ExecutionPolicy Bypass -File explorations/v2-homepage-prep/make-photos.ps1
param(
  [string]$Src = (Join-Path $PSScriptRoot '..\..\originals\cooking_prep.jpg'),
  [string]$Out = (Join-Path $PSScriptRoot 'photos'),
  [int[]]$Widths = @(1740, 1200, 800)
)
Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force $Out | Out-Null

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 76L

$img = [System.Drawing.Image]::FromFile((Resolve-Path $Src))
try {
  if ($img.PropertyIdList -contains 0x0112) {
    switch ([BitConverter]::ToUInt16($img.GetPropertyItem(0x0112).Value, 0)) {
      3 { $img.RotateFlip('Rotate180FlipNone') } 6 { $img.RotateFlip('Rotate90FlipNone') } 8 { $img.RotateFlip('Rotate270FlipNone') }
    }
  }
  foreach ($w in $Widths) {
    $w = [Math]::Min($w, $img.Width)
    $h = [int]($img.Height * $w / $img.Width)
    # A new Bitmap carries no EXIF, so no camera or location metadata is copied
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.DrawImage($img, 0, 0, $w, $h)
    $g.Dispose()
    $path = Join-Path $Out "cooking-prep-$w.jpg"
    $bmp.Save($path, $jpeg, $params); $bmp.Dispose()
    '{0}  {1}x{2}  {3} KB' -f (Split-Path $path -Leaf), $w, $h, [int]((Get-Item $path).Length / 1KB)
  }
} finally { $img.Dispose() }
