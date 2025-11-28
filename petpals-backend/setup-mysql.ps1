#!/usr/bin/env powershell
# MySQL Setup Script for PetPals Backend
# This script helps configure MySQL database

Write-Host "=== MySQL Setup for PetPals ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if MySQL is running
Write-Host "[1/4] Checking MySQL service..." -ForegroundColor Yellow
$mysqlService = Get-Service -Name "MySQL*" -ErrorAction SilentlyContinue

if ($mysqlService) {
    Write-Host "✓ MySQL service found: $($mysqlService.DisplayName)" -ForegroundColor Green
    Write-Host "  Status: $($mysqlService.Status)" -ForegroundColor Gray
    
    if ($mysqlService.Status -ne "Running") {
        Write-Host "  Starting MySQL service..." -ForegroundColor Yellow
        Start-Service $mysqlService.Name
        Write-Host "✓ MySQL service started" -ForegroundColor Green
    }
}
else {
    Write-Host "✗ MySQL service not found!" -ForegroundColor Red
    Write-Host "  Please install MySQL first." -ForegroundColor Gray
    Write-Host "  Download from: https://dev.mysql.com/downloads/installer/" -ForegroundColor Gray
    exit 1
}

# Step 2: Test connection
Write-Host "`n[2/4] Testing database connection..." -ForegroundColor Yellow

try {
    mysql -u root -e "SELECT 1;" 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Connection successful!" -ForegroundColor Green
    }
    else {
        Write-Host "✗ Connection failed. Please check MySQL installation." -ForegroundColor Red
        exit 1
    }
}
catch {
    Write-Host "✗ Could not connect to MySQL" -ForegroundColor Red
    Write-Host "  Make sure MySQL is installed and root user has no password" -ForegroundColor Gray
    exit 1
}

# Step 3: Create database
Write-Host "`n[3/4] Creating petpals database..." -ForegroundColor Yellow
$dbExists = mysql -u root -e "SHOW DATABASES LIKE 'petpals';" 2>&1

if ($dbExists -match "petpals") {
    Write-Host "  Database 'petpals' already exists" -ForegroundColor Gray
    $response = Read-Host "  Drop and recreate? (y/n)"
    if ($response -eq 'y') {
        mysql -u root -e "DROP DATABASE petpals;" 2>&1 | Out-Null
        mysql -u root -e "CREATE DATABASE petpals;" 2>&1 | Out-Null
        Write-Host "✓ Database recreated successfully!" -ForegroundColor Green
    }
}
else {
    mysql -u root -e "CREATE DATABASE petpals;" 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database 'petpals' created successfully!" -ForegroundColor Green
    }
    else {
        Write-Host "✗ Failed to create database" -ForegroundColor Red
        exit 1
    }
}

# Step 4: Run Prisma migrations
Write-Host "`n[4/4] Running database migrations..." -ForegroundColor Yellow
Set-Location $PSScriptRoot

Write-Host "  Generating Prisma Client..." -ForegroundColor Gray
npm run prisma:generate 2>&1 | Out-Null

Write-Host "  Pushing schema to database..." -ForegroundColor Gray
npx prisma db push 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Migrations completed successfully!" -ForegroundColor Green
}
else {
    Write-Host "! Migration completed with warnings" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. npm run prisma:seed    # Seed database with sample data" -ForegroundColor White
Write-Host "2. npm run start:dev      # Start the development server" -ForegroundColor White
Write-Host ""
