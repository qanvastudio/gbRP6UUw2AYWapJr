$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
$cards = & node -e "console.log(JSON.stringify(require('./procedimientos-featured.cjs')))"
if ($LASTEXITCODE -ne 0) { throw 'Could not read procedure image data.' }
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
foreach ($card in ($cards | ConvertFrom-Json)) {
  $sourcePath = Join-Path $projectRoot $card.sourceImage
  $sourceImage = [System.Drawing.Image]::FromFile($sourcePath)
  try {
    foreach ($variant in @(@{Path=$card.mobileImage; Width=$card.mobileWidth; Quality=74}, @{Path=$card.image; Width=$card.width; Quality=78})) {
      $targetWidth = [int]$variant.Width
      $targetHeight = [int][Math]::Round($sourceImage.Height * $targetWidth / $sourceImage.Width)
      $bitmap = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
      $drawing = [System.Drawing.Graphics]::FromImage($bitmap)
      $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
      try {
        $drawing.Clear([System.Drawing.Color]::White)
        $drawing.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $drawing.DrawImage($sourceImage, 0, 0, $targetWidth, $targetHeight)
        $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$variant.Quality)
        $bitmap.Save((Join-Path $projectRoot $variant.Path), $jpegEncoder, $parameters)
      } finally { $parameters.Dispose(); $drawing.Dispose(); $bitmap.Dispose() }
    }
  } finally { $sourceImage.Dispose() }
}
