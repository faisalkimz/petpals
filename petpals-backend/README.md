# PetPals Backend API

REST API for the PetPals pet adoption platform built with NestJS, PostgreSQL, and Prisma.

## Features

- 🔐 JWT Authentication (Register/Login)
- 🐕 Pet Management (CRUD operations)
- 🔍 Advanced Search & Filtering
- 📁 Category Management
- ❤️ Favorites System
- 📸 Image Upload
- 🗄️ MySQL Database with Prisma ORM

## Tech Stack

- **Framework**: NestJS
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT (Passport.js)
- **Validation**: class-validator
- **File Upload**: Multer

## Setup Instructions

### Prerequisites

- Node.js >= 18.0.0
- MySQL database running locally or remotely

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:

**Option 1: Automated Setup (Recommended)**
```bash
# Run the automated setup script
powershell -ExecutionPolicy Bypass -File .\setup-mysql.ps1
```

This script will guide you through:
- Checking MySQL service status
- Creating the database
- Running migrations

**Option 2: Manual Setup**

```bash
cp .env.example .env
```

Edit `.env` and configure your database connection:
```env
DATABASE_URL="mysql://root@localhost:3306/petpals"
JWT_SECRET="your-secret-key"
PORT=3000
```

**MySQL Configuration:**

1. Ensure MySQL is installed and running:
   ```powershell
   # Check MySQL service status
   Get-Service MySQL*
   
   # Start MySQL if not running
   Start-Service MySQL80  # or your MySQL service name
   ```

2. Create the database:
   ```bash
   mysql -u root -e "CREATE DATABASE petpals;"
   ```

3. If using a password for MySQL root user, update the connection string:
   ```env
   DATABASE_URL="mysql://root:yourpassword@localhost:3306/petpals"
   ```

3. Run Prisma migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Seed the database with sample data:
```bash
npm run prisma:seed
```

### Running the API

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (protected)

### Pets
- `GET /pets` - Get all pets (with optional filters)
- `GET /pets/:id` - Get single pet
- `POST /pets` - Create pet
- `PUT /pets/:id` - Update pet
- `DELETE /pets/:id` - Delete pet

**Query Parameters for filtering:**
- `species` - Filter by species (Dog, Cat, etc.)
- `breed` - Filter by breed (partial match)
- `minAge` - Minimum age in months
- `maxAge` - Maximum age in months
- `gender` - Male or Female
- `size` - Small, Medium, or Large
- `categoryId` - Filter by category ID
- `search` - Search in name, breed, or description

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category with pets

### Favorites (Protected)
- `GET /favorites` - Get user's favorite pets
- `POST /favorites/:petId` - Add pet to favorites
- `DELETE /favorites/:petId` - Remove from favorites
- `GET /favorites/check/:petId` - Check if pet is favorited

### Upload
- `POST /upload/image` - Upload pet image (max 5MB)

## Sample Login

Email: `demo@petpals.com`
Password: `password123`

## Database Schema

- **User**: User accounts with authentication
- **Pet**: Pet listings with details
- **Category**: Pet categories (Dog, Cat, Birds, etc.)
- **Favorite**: User's favorited pets (many-to-many)

## Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Open Prisma Studio (GUI)
npm run prisma:studio
```

## Project Structure

```
src/
├── auth/           # Authentication module
├── pets/           # Pets module
├── categories/     # Categories module
├── favorites/      # Favorites module
├── upload/         # File upload module
├── prisma/         # Prisma service
├── app.module.ts   # Root module
└── main.ts         # Entry point
```

## License

MIT
