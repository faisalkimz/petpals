export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    createdAt: string;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
}

export interface Pet {
    id: string;
    name: string;
    species: string;
    breed: string;
    age: number;
    gender: string;
    size: string;
    distance: number;
    price: number;
    description: string;
    images: string[];
    shelter: string;
    tags: string[];
    category: Category;
    createdAt: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    name: string;
}
