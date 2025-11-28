import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
    constructor(private prisma: PrismaService) { }

    async getUserFavorites(userId: string) {
        const favorites = await this.prisma.favorite.findMany({
            where: { userId },
            include: {
                pet: {
                    include: {
                        category: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return favorites.map((fav) => fav.pet);
    }

    async addFavorite(userId: string, petId: string) {
        // Check if pet exists
        const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
        if (!pet) {
            throw new NotFoundException('Pet not found');
        }

        // Check if already favorited
        const existing = await this.prisma.favorite.findUnique({
            where: {
                userId_petId: {
                    userId,
                    petId,
                },
            },
        });

        if (existing) {
            return { message: 'Already in favorites', favorite: existing };
        }

        const favorite = await this.prisma.favorite.create({
            data: {
                userId,
                petId,
            },
            include: {
                pet: {
                    include: {
                        category: true,
                    },
                },
            },
        });

        return { message: 'Added to favorites', favorite };
    }

    async removeFavorite(userId: string, petId: string) {
        const favorite = await this.prisma.favorite.findUnique({
            where: {
                userId_petId: {
                    userId,
                    petId,
                },
            },
        });

        if (!favorite) {
            throw new NotFoundException('Favorite not found');
        }

        await this.prisma.favorite.delete({
            where: {
                userId_petId: {
                    userId,
                    petId,
                },
            },
        });

        return { message: 'Removed from favorites' };
    }

    async isFavorite(userId: string, petId: string) {
        const favorite = await this.prisma.favorite.findUnique({
            where: {
                userId_petId: {
                    userId,
                    petId,
                },
            },
        });

        return { isFavorite: !!favorite };
    }
}
