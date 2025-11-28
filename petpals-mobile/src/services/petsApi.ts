import { api } from './api';
import { Pet, Category } from '../types';

export interface PetFilters {
    species?: string;
    breed?: string;
    minAge?: number;
    maxAge?: number;
    gender?: string;
    size?: string;
    categoryId?: string;
    search?: string;
}

export const petsApi = {
    async getAll(filters?: PetFilters): Promise<Pet[]> {
        const response = await api.get<Pet[]>('/pets', { params: filters });
        return response.data;
    },

    async getOne(id: string): Promise<Pet> {
        const response = await api.get<Pet>(`/pets/${id}`);
        return response.data;
    },

    async getCategories(): Promise<Category[]> {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },

    async getFavorites(): Promise<Pet[]> {
        const response = await api.get<Pet[]>('/favorites');
        return response.data;
    },

    async addFavorite(petId: string): Promise<void> {
        await api.post(`/favorites/${petId}`);
    },

    async removeFavorite(petId: string): Promise<void> {
        await api.delete(`/favorites/${petId}`);
    },

    async isFavorite(petId: string): Promise<boolean> {
        const response = await api.get<{ isFavorite: boolean }>(`/favorites/check/${petId}`);
        return response.data.isFavorite;
    },
};
