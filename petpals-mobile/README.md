# PetPals Mobile App

Beautiful React Native mobile application for browsing and adopting pets.

## Features

- 🐕 Browse pets by category (Dogs, Cats, Birds, Fish, Rabbits)
- 🔍 Search and filter pets
- ❤️ Save favorite pets
- 📱 Beautiful UI with smooth animations
- 🔐 User authentication (Register/Login)
- 📸 Pet details with image carousel
- 📍 Distance-based pet discovery

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6 (Stack & Tab navigators)
- **State Management**: Zustand
- **API**: Axios with interceptors
- **Storage**: Expo Secure Store (for auth tokens)
- **UI**: Custom components with Linear Gradient
- **Animations**: React Native Reanimated
- **Icons**: Expo Vector Icons

## Prerequisites

- Node.js >= 18.0.0
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator
- PetPals Backend API running (see backend README)

## Installation

1. Navigate to the mobile directory:
```bash
cd petpals-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL in `src/services/api.ts`:
```typescript
// For iOS simulator
const API_URL = 'http://localhost:3000';

// For Android emulator
const API_URL = 'http://10.0.2.2:3000';

// For physical device (use your computer's IP)
const API_URL = 'http://YOUR_IP_ADDRESS:3000';
```

## Running the App

Start the Expo development server:
```bash
npm start
```

Then:
- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Scan QR code with Expo Go app on your phone

## Demo Account

Email: `demo@petpals.com`
Password: `password123`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CategoryPill.tsx
│   ├── PetCard.tsx
│   └── FavoriteButton.tsx
├── screens/            # Screen components
│   ├── OnboardingScreen.tsx
│   ├── AuthScreen.tsx
│   ├── HomeScreen.tsx
│   ├── PetDetailScreen.tsx
│   ├── FavoritesScreen.tsx
│   └── ProfileScreen.tsx
├── navigation/         # Navigation setup
│   └── AppNavigator.tsx
├── services/          # API services
│   ├── api.ts
│   ├── authApi.ts
│   └── petsApi.ts
├── store/            # Zustand state stores
│   ├── authStore.ts
│   └── petsStore.ts
├── theme/           # Design system
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
└── types/          # TypeScript types
    └── index.ts
```

## Key Features Explained

### Authentication Flow
- Onboarding → Auth (Login/Signup) → Main App
- JWT tokens stored securely with Expo Secure Store
- Automatic token refresh on app restart

### State Management
- **Auth Store**: User authentication & profile
- **Pets Store**: Pets data, categories, favorites, filters

### Navigation
- **Stack Navigator**: Main navigation (Onboarding, Auth, Main, PetDetail)
- **Tab Navigator**: Bottom tabs (Home, Favorites, Messages, Profile)

### API Integration
- Axios instance with auth interceptors
- Automatic token injection
- Error handling and 401 redirect

## Customization

### Colors
Edit `src/theme/colors.ts` to customize the color scheme.

### Typography
Edit `src/theme/typography.ts` for font sizes and weights.

### API Endpoint
Update `src/services/api.ts` to point to your backend.

## Building for Production

### iOS
```bash
npm run build:ios
```

### Android
```bash
npm run build:android
```

## Troubleshooting

### Cannot connect to backend
- Make sure backend is running on port 3000
- For physical device, use your computer's IP address
- For Android emulator, use `10.0.2.2` instead of `localhost`

### Images not loading
- Check that backend is running and accessible
- Verify image URLs in the network tab
- Check CORS settings in backend

## License

MIT
