# 🐾 PetPals - Pet Adoption Platform

A full-stack pet adoption application built with React Native (Expo) and NestJS. Find and adopt your perfect furry companion!

![PetPals](https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=400&fit=crop)

## ✨ Features

### Mobile App (React Native + Expo)
- 🎨 Beautiful UI with warm peach/orange color palette
- 🐕 Browse pets by category (Dogs, Cats, Birds, Fish, Rabbits)
- 🔍 Advanced search and filtering
- ❤️ Save favorite pets
- 📸 Pet detail pages with image carousels
- 🔐 User authentication (JWT)
- 📱 Smooth animations with React Native Reanimated
- 🌍 Distance-based pet discovery

### Backend API (NestJS + PostgreSQL)
- 🔒 JWT Authentication
- 🗄️ PostgreSQL database with Prisma ORM
- 📝 RESTful API endpoints
- 🔎 Advanced search and filtering
- ❤️ Favorites management
- 📁 Category system
- 🌱 Seeded with sample data

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile framework
- **Expo** - Development and build platform
- **TypeScript** - Type safety
- **Zustand** - State management
- **React Navigation** - Navigation library
- **Axios** - HTTP client
- **React Native Reanimated** - Smooth animations
- **Expo Linear Gradient** - Beautiful gradients

### Backend
- **NestJS** - Node.js framework
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads

## 📁 Project Structure

```
petpals/
├── petpals-backend/       # NestJS API
│   ├── src/
│   │   ├── auth/         # Authentication module
│   │   ├── pets/         # Pets module
│   │   ├── categories/   # Categories module
│   │   ├── favorites/    # Favorites module
│   │   ├── upload/       # File upload module
│   │   └── prisma/       # Database service
│   ├── prisma/           # Database schema & migrations
│   └── README.md
│
└── petpals-mobile/       # React Native app
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── screens/      # Screen components
    │   ├── navigation/   # Navigation setup
    │   ├── services/     # API services
    │   ├── store/        # State management
    │   ├── theme/        # Design system
    │   └── types/        # TypeScript types
    └── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- PostgreSQL database
- iOS Simulator (Mac) or Android Emulator
- Expo CLI (optional, but recommended)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd faisal
```

### 2. Setup Backend

```bash
cd petpals-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start development server
npm run start:dev
```

The API will be available at `http://localhost:3000`

### 3. Setup Mobile App

```bash
cd ../petpals-mobile

# Install dependencies
npm install

# Update API URL in src/services/api.ts if needed

# Start Expo development server
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

### 4. Login

Use the demo account:
- **Email**: `demo@petpals.com`
- **Password**: `password123`

## 📱 Screenshots

The app includes:

1. **Onboarding Screen** - Welcome page with hero image
2. **Authentication** - Login/Signup with validation
3. **Home Screen** - Category pills and pet feed
4. **Pet Detail Screen** - Full pet information with carousel
5. **Favorites Screen** - Grid of favorite pets
6. **Profile Screen** - User profile and settings

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (protected)

### Pets
- `GET /pets` - Get all pets (with filters)
- `GET /pets/:id` - Get single pet
- `POST /pets` - Create pet
- `PUT /pets/:id` - Update pet
- `DELETE /pets/:id` - Delete pet

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category with pets

### Favorites (Protected)
- `GET /favorites` - Get user's favorites
- `POST /favorites/:petId` - Add to favorites
- `DELETE /favorites/:petId` - Remove from favorites

## 🎨 Design System

### Colors
- **Primary**: `#FF9F66` (Warm orange)
- **Background**: `#FFF9F5` (Light cream)
- **Accent**: `#FFD4A3` (Soft peach)
- **Text**: `#2D2D2D` (Dark gray)
- **Heart**: `#FF6B9D` (Pink)

### Typography
- **Font Family**: System (iOS: SF Pro, Android: Roboto)
- **Sizes**: 10px - 48px scale
- **Weights**: Regular (400), Medium (500), Semi-Bold (600), Bold (700)

## 🔧 Development

### Backend Development

```bash
cd petpals-backend

# Run in watch mode
npm run start:dev

# View Prisma Studio (database GUI)
npm run prisma:studio

# Create new migration
npm run prisma:migrate
```

### Mobile Development

```bash
cd petpals-mobile

# Start with cache clear
npm start --clear

# Run on specific platform
npm run ios
npm run android

# Type checking
npx tsc --noEmit
```

## 📦 Deployment

### Backend Deployment
- Deploy to Railway, Heroku, or AWS
- Set environment variables
- Run migrations on production database
- Update CORS settings

### Mobile Deployment
- Build for iOS: `eas build --platform ios`
- Build for Android: `eas build --platform android`
- Submit to App Store / Play Store

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern pet adoption apps
- Sample pet images from Unsplash
- Icons from Expo Vector Icons (Ionicons)

## 📞 Support

For support, email your-email@example.com or create an issue in this repository.

---

**Built with ❤️ for pet lovers**
