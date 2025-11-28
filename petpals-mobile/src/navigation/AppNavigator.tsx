import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useAuthStore } from '../store/authStore';

// Screens
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PetDetailScreen } from '../screens/PetDetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Messages') {
                        iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textLight,
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                    borderTopWidth: 1,
                    borderTopColor: colors.divider,
                    backgroundColor: colors.backgroundLight,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
            <Tab.Screen
                name="Messages"
                component={ProfileScreen}
                options={{
                    tabBarBadge: undefined,
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export function AppNavigator() {
    const { isAuthenticated, loadStoredAuth } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            await loadStoredAuth();
            setIsLoading(false);
        };
        initAuth();
    }, []);

    if (isLoading) {
        return null; // Or a splash screen component
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={isAuthenticated ? 'Main' : 'Onboarding'}
            >
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Auth" component={AuthScreen} />
                <Stack.Screen name="Main" component={MainTabs} />
                <Stack.Screen
                    name="PetDetail"
                    component={PetDetailScreen}
                    options={{
                        presentation: 'card',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
