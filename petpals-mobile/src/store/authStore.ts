import { create } from 'zustand';
import { User } from '../types';
import { authApi } from '../services/authApi';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    loadStoredAuth: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (email: string, password: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await authApi.login({ email, password });
            set({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Login failed',
                isLoading: false,
            });
            throw error;
        }
    },

    register: async (email: string, password: string, name: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await authApi.register({ email, password, name });
            set({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Registration failed',
                isLoading: false,
            });
            throw error;
        }
    },

    logout: async () => {
        await authApi.logout();
        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });
    },

    loadStoredAuth: async () => {
        try {
            const [user, token] = await Promise.all([
                authApi.getStoredUser(),
                authApi.getStoredToken(),
            ]);

            if (user && token) {
                set({
                    user,
                    token,
                    isAuthenticated: true,
                });
            }
        } catch (error) {
            console.error('Failed to load stored auth:', error);
        }
    },

    clearError: () => set({ error: null }),
}));
