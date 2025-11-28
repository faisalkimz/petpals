import { api } from './api';
import { AuthResponse, LoginDto, RegisterDto, User } from '../types';
import * as SecureStore from 'expo-secure-store';

export const authApi = {
    async register(data: RegisterDto): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);
        await SecureStore.setItemAsync('auth_token', response.data.token);
        await SecureStore.setItemAsync('user_data', JSON.stringify(response.data.user));
        return response.data;
    },

    async login(data: LoginDto): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', data);
        await SecureStore.setItemAsync('auth_token', response.data.token);
        await SecureStore.setItemAsync('user_data', JSON.stringify(response.data.user));
        return response.data;
    },

    async getMe(): Promise<User> {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },

    async logout(): Promise<void> {
        await SecureStore.deleteItemAsync('auth_token');
        await SecureStore.deleteItemAsync('user_data');
    },

    async getStoredUser(): Promise<User | null> {
        const userData = await SecureStore.getItemAsync('user_data');
        return userData ? JSON.parse(userData) : null;
    },

    async getStoredToken(): Promise<string | null> {
        return await SecureStore.getItemAsync('auth_token');
    },
};
