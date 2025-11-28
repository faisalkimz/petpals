import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';

@Controller('pets')
export class PetsController {
    constructor(private petsService: PetsService) { }

    @Get()
    async findAll(
        @Query('species') species?: string,
        @Query('breed') breed?: string,
        @Query('minAge') minAge?: string,
        @Query('maxAge') maxAge?: string,
        @Query('gender') gender?: string,
        @Query('size') size?: string,
        @Query('categoryId') categoryId?: string,
        @Query('search') search?: string,
    ) {
        return this.petsService.findAll({
            species,
            breed,
            minAge: minAge ? parseInt(minAge) : undefined,
            maxAge: maxAge ? parseInt(maxAge) : undefined,
            gender,
            size,
            categoryId,
            search,
        });
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.petsService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreatePetDto) {
        return this.petsService.create(dto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: Partial<CreatePetDto>) {
        return this.petsService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.petsService.remove(id);
    }
}
