import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
    constructor(private favoritesService: FavoritesService) { }

    @Get()
    async getUserFavorites(@GetUser('id') userId: string) {
        return this.favoritesService.getUserFavorites(userId);
    }

    @Post(':petId')
    async addFavorite(@GetUser('id') userId: string, @Param('petId') petId: string) {
        return this.favoritesService.addFavorite(userId, petId);
    }

    @Delete(':petId')
    async removeFavorite(@GetUser('id') userId: string, @Param('petId') petId: string) {
        return this.favoritesService.removeFavorite(userId, petId);
    }

    @Get('check/:petId')
    async isFavorite(@GetUser('id') userId: string, @Param('petId') petId: string) {
        return this.favoritesService.isFavorite(userId, petId);
    }
}
