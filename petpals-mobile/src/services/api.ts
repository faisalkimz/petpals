import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Use your computer's IP address when testing on physical device
// For Android emulator: use 10.0.2.2
// For iOS simulator: use localhost
const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid - clear stored data
            await SecureStore.deleteItemAsync('auth_token');
            await SecureStore.deleteItemAsync('user_data');
        }
        return Promise.reject(error);
    }
);

export { api, API_URL };
