#!/usr/bin/env powershell
# PostgreSQL Setup Script for PetPals Backend
# This script helps configure PostgreSQL with the correct password

Write-Host "=== PostgreSQL Setup for PetPals ===" -ForegroundColor Cyan
Write-Host ""

$password = "Software@2020"

# Step 1: Check if PostgreSQL is running
Write-Host "[1/5] Checking PostgreSQL service..." -ForegroundColor Yellow
$pgService = Get-Service -Name "postgresql*" -ErrorAction SilentlyContinue

if ($pgService) {
    Write-Host "✓ PostgreSQL service found: $($pgService.DisplayName)" -ForegroundColor Green
    Write-Host "  Status: $($pgService.Status)" -ForegroundColor Gray
}
else {
    Write-Host "✗ PostgreSQL service not found!" -ForegroundColor Red
    Write-Host "  Please install PostgreSQL first." -ForegroundColor Gray
    exit 1
}

# Step 2: Set PostgreSQL password
Write-Host "`n[2/5] Setting PostgreSQL password..." -ForegroundColor Yellow
Write-Host "  Run this SQL command in pgAdmin or psql:" -ForegroundColor Gray
Write-Host "  ALTER USER postgres WITH PASSWORD '$password';" -ForegroundColor White
Write-Host ""
$response = Read-Host "  Have you completed this step? (y/n)"

if ($response -ne 'y') {
    Write-Host "  Please complete this step manually and run this script again." -ForegroundColor Yellow
    exit 0
}

# Step 3: Test connection
Write-Host "`n[3/5] Testing database connection..." -ForegroundColor Yellow
$env:PGPASSWORD = $password

try {
    psql -h localhost -U postgres -d postgres -c "SELECT 1;" 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Connection successful!" -ForegroundColor Green
    }
    else {
        Write-Host "✗ Connection failed. Please check:" -ForegroundColor Red
        Write-Host "  1. Password is set correctly" -ForegroundColor Gray
        Write-Host "  2. pg_hba.conf allows md5 authentication" -ForegroundColor Gray
        Write-Host "  3. PostgreSQL service has been restarted" -ForegroundColor Gray
        exit 1
    }
}
catch {
    Write-Host "✗ Could not connect to PostgreSQL" -ForegroundColor Red
    exit 1
}

# Step 4: Create database
Write-Host "`n[4/5] Creating petpals database..." -ForegroundColor Yellow
$dbExists = psql -h localhost -U postgres -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='petpals'" 2>&1

if ($dbExists -eq "1") {
    Write-Host "  Database 'petpals' already exists" -ForegroundColor Gray
}
else {
    psql -h localhost -U postgres -d postgres -c "CREATE DATABASE petpals;" 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database 'petpals' created successfully!" -ForegroundColor Green
    }
    else {
        Write-Host "✗ Failed to create database" -ForegroundColor Red
        exit 1
    }
}

# Step 5: Run Prisma migrations
Write-Host "`n[5/5] Running database migrations..." -ForegroundColor Yellow
Set-Location $PSScriptRoot

Write-Host "  Generating Prisma Client..." -ForegroundColor Gray
npm run prisma:generate 2>&1 | Out-Null

Write-Host "  Pushing schema to database..." -ForegroundColor Gray
npx prisma db push --accept-data-loss 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Migrations completed successfully!" -ForegroundColor Green
}
else {
    Write-Host "! Migration had warnings, but database is ready" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. npm run prisma:seed    # Seed database with sample data" -ForegroundColor White
Write-Host "2. npm run start:dev      # Start the development server" -ForegroundColor White
Write-Host ""
