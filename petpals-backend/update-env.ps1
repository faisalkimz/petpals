#!/usr/bin/env powershell

# Script to configure MySQL connection for PetPals
$envFile = "c:\Users\Coding-guy\Desktop\faisal\petpals-backend\.env"
$envExampleFile = "c:\Users\Coding-guy\Desktop\faisal\petpals-backend\.env.example"

Write-Host "Configuring MySQL connection..." -ForegroundColor Cyan

# Check if .env file exists
if (Test-Path $envFile) {
    Write-Host ".env file exists. Updating..." -ForegroundColor Yellow
    
    # Read current content
    $content = Get-Content $envFile
    
    # Update DATABASE_URL to MySQL
    $newContent = $content -replace 'DATABASE_URL=".*"', 'DATABASE_URL="mysql://root:Software@2020@localhost:3306/petpals"'
    
    # Write back to file
    $newContent | Set-Content $envFile
    
    Write-Host "✓ .env file updated successfully!" -ForegroundColor Green
}
else {
    Write-Host ".env file not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item $envExampleFile $envFile
    Write-Host "✓ .env file created successfully!" -ForegroundColor Green
}

Write-Host "`nDatabase URL configured for MySQL (root user with password)" -ForegroundColor Green
Write-Host "Connection: mysql://root:Software@2020@localhost:3306/petpals" -ForegroundColor Gray
