# Builds the box textures for the recipe-box prototype from Betsy's three photos of her recipe box.
# Each texture is one face of the real box, straightened with a perspective warp (four corners in the photo
# are mapped to a flat rectangle), resized and saved as a metadata-free JPEG in ./photos (git-ignored).
# The photos are only read, never modified.
# Usage (from the repo root):
#   powershell -ExecutionPolicy Bypass -File explorations/v2-recipe-box/make-photos.ps1
# By default it reads originals/recipe-box/recipe-box-{open,closed}.png (git-ignored). Those are the copies
# Betsy pasted into the chat (1152x1536); full-resolution originals can replace them under the same names,
# but the corner coordinates below are in pixels of the 1152x1536 copies, so scale them if the size changes.
param(
  [string]$Src = (Join-Path $PSScriptRoot '..\..\originals\recipe-box'),
  [string]$Out = (Join-Path $PSScriptRoot 'photos')
)
Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force $Out | Out-Null

# Perspective warp: maps the quad (tl, tr, br, bl) in the source onto a w x h rectangle, with bilinear sampling.
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class Warp {
  // Homography from the unit square to the quad (Heckbert's square-to-quad).
  static double[] SquareToQuad(double[] q) {
    double x0 = q[0], y0 = q[1], x1 = q[2], y1 = q[3], x2 = q[4], y2 = q[5], x3 = q[6], y3 = q[7];
    double sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
    double a, b, c, d, e, f, g, h;
    if (Math.Abs(sx) < 1e-9 && Math.Abs(sy) < 1e-9) {
      a = x1 - x0; b = x2 - x1; c = x0; d = y1 - y0; e = y2 - y1; f = y0; g = 0; h = 0;
    } else {
      double dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2;
      double den = dx1 * dy2 - dx2 * dy1;
      g = (sx * dy2 - dx2 * sy) / den; h = (dx1 * sy - sx * dy1) / den;
      a = x1 - x0 + g * x1; b = x3 - x0 + h * x3; c = x0;
      d = y1 - y0 + g * y1; e = y3 - y0 + h * y3; f = y0;
    }
    return new double[] { a, b, c, d, e, f, g, h };
  }
  public static Bitmap Run(Bitmap src, double[] quad, int w, int h) {
    // quad: tl, tr, br, bl as x,y pairs. SquareToQuad expects corners in order (0,0) (1,0) (1,1) (0,1).
    double[] m = SquareToQuad(quad);
    var dst = new Bitmap(w, h, PixelFormat.Format24bppRgb);
    var sd = src.LockBits(new Rectangle(0, 0, src.Width, src.Height), ImageLockMode.ReadOnly, PixelFormat.Format24bppRgb);
    var dd = dst.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format24bppRgb);
    var sb = new byte[sd.Stride * src.Height]; Marshal.Copy(sd.Scan0, sb, 0, sb.Length);
    var db = new byte[dd.Stride * h];
    // Supersample 2x2 per output pixel, so downscaled textures stay smooth.
    for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
      double r = 0, gg = 0, bb = 0;
      for (int sy = 0; sy < 2; sy++) for (int sxx = 0; sxx < 2; sxx++) {
        double u = (x + .25 + sxx * .5) / w, v = (y + .25 + sy * .5) / h;
        double den = m[6] * u + m[7] * v + 1;
        double px = (m[0] * u + m[1] * v + m[2]) / den, py = (m[3] * u + m[4] * v + m[5]) / den;
        int ix = (int)Math.Floor(px), iy = (int)Math.Floor(py);
        double fx = px - ix, fy = py - iy;
        ix = Math.Max(0, Math.Min(src.Width - 2, ix)); iy = Math.Max(0, Math.Min(src.Height - 2, iy));
        for (int ch = 0; ch < 3; ch++) {
          int i00 = iy * sd.Stride + ix * 3 + ch, i01 = i00 + 3, i10 = i00 + sd.Stride, i11 = i10 + 3;
          double val = sb[i00] * (1 - fx) * (1 - fy) + sb[i01] * fx * (1 - fy) + sb[i10] * (1 - fx) * fy + sb[i11] * fx * fy;
          if (ch == 0) bb += val; else if (ch == 1) gg += val; else r += val;
        }
      }
      int o = y * dd.Stride + x * 3;
      db[o] = (byte)(bb / 4 + .5); db[o + 1] = (byte)(gg / 4 + .5); db[o + 2] = (byte)(r / 4 + .5);
    }
    Marshal.Copy(db, 0, dd.Scan0, db.Length);
    src.UnlockBits(sd); dst.UnlockBits(dd);
    return dst;
  }
}
'@

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 80L

# Corners are tl, tr, br, bl in pixels of the 1152x1536 photos. Sizes keep each face's real proportions
# (the box is about 1.6 times as wide as it is deep) at roughly 2x the size the landing page shows it.
$jobs = @(
  # The lid's outer front, from the closed photo: corner brackets, wear and the hasp's hinge plate.
  @{ File = 'recipe-box-closed.png'; Name = 'lid-front';  Quad = @(241,757, 1088,740, 1070,926, 244,947); W = 900; H = 214 },
  # The grooved top of the lid, from the closed photo. The photo sees it at a steep angle, so this copy is
  # stretched to the lid's real depth and is softer than the other faces.
  @{ File = 'recipe-box-closed.png'; Name = 'lid-top';    Quad = @(290,601, 918,595, 1080,736, 250,751); W = 900; H = 540 },
  # The inside of the lid, from the open photo, shown once the lid swings open.
  @{ File = 'recipe-box-open.png';   Name = 'lid-inside'; Quad = @(303,447, 938,438, 896,750, 318,753); W = 900; H = 520 },
  # The front of the base, from the open photo: latch plate and the lower corner brackets, no hasp over it.
  @{ File = 'recipe-box-open.png';   Name = 'base-front'; Quad = @(340,1055, 996,1047, 962,1244, 354,1303); W = 900; H = 320 }
)

foreach ($job in $jobs) {
  $img = [System.Drawing.Bitmap]::FromFile((Resolve-Path (Join-Path $Src $job.File)))
  try {
    # A new Bitmap carries no metadata, so nothing from the camera or phone is copied.
    $bmp = [Warp]::Run($img, [double[]]$job.Quad, $job.W, $job.H)
    $path = Join-Path $Out "$($job.Name).jpg"
    $bmp.Save($path, $jpeg, $params); $bmp.Dispose()
    '{0}  {1}x{2}  {3} KB' -f (Split-Path $path -Leaf), $job.W, $job.H, [int]((Get-Item $path).Length / 1KB)
  } finally { $img.Dispose() }
}
