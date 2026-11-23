$ErrorActionPreference = "Stop"

$projectName = "huang-tao-portfolio"
$productionUrl = "https://huang-tao-portfolio.pages.dev/"

Write-Host "[1/2] Building the production site..." -ForegroundColor Cyan
pnpm run build
if ($LASTEXITCODE -ne 0) {
  throw "The Vite production build failed. Deployment was cancelled."
}

Write-Host "[2/2] Deploying to Cloudflare Pages..." -ForegroundColor Cyan
npx --yes wrangler pages deploy dist --project-name $projectName --branch main
if ($LASTEXITCODE -ne 0) {
  throw "Cloudflare Pages deployment failed."
}

Write-Host "Deployment complete: $productionUrl" -ForegroundColor Green
