import { create } from 'zustand';
import { Pet, Category } from '../types';
import { petsApi, PetFilters } from '../services/petsApi';

interface PetsState {
    pets: Pet[];
    categories: Category[];
    favorites: Pet[];
    selectedCategory: string | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchPets: (filters?: PetFilters) => Promise<void>;
    fetchCategories: () => Promise<void>;
    fetchFavorites: () => Promise<void>;
    toggleFavorite: (petId: string) => Promise<void>;
    setSelectedCategory: (categoryId: string | null) => void;
    isFavorite: (petId: string) => boolean;
}

export const usePetsStore = create<PetsState>((set, get) => ({
    pets: [],
    categories: [],
    favorites: [],
    selectedCategory: null,
    isLoading: false,
    error: null,

    fetchPets: async (filters?: PetFilters) => {
        try {
            set({ isLoading: true, error: null });
            const pets = await petsApi.getAll(filters);
            set({ pets, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch pets',
                isLoading: false,
            });
        }
    },

    fetchCategories: async () => {
        try {
            const categories = await petsApi.getCategories();
            set({ categories });
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to fetch categories' });
        }
    },

    fetchFavorites: async () => {
        try {
            const favorites = await petsApi.getFavorites();
            set({ favorites });
        } catch (error: any) {
            console.error('Failed to fetch favorites:', error);
        }
    },

    toggleFavorite: async (petId: string) => {
        const { favorites } = get();
        const isFav = favorites.some((pet) => pet.id === petId);

        try {
            if (isFav) {
                await petsApi.removeFavorite(petId);
                set({ favorites: favorites.filter((pet) => pet.id !== petId) });
            } else {
                await petsApi.addFavorite(petId);
                // Refetch favorites to get the complete pet data
                const updatedFavorites = await petsApi.getFavorites();
                set({ favorites: updatedFavorites });
            }
        } catch (error: any) {
            console.error('Failed to toggle favorite:', error);
        }
    },

    setSelectedCategory: (categoryId: string | null) => {
        set({ selectedCategory: categoryId });
    },

    isFavorite: (petId: string) => {
        const { favorites } = get();
        return favorites.some((pet) => pet.id === petId);
    },
}));
