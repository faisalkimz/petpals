import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetsService {
    constructor(private prisma: PrismaService) { }

    async findAll(filters?: {
        species?: string;
        breed?: string;
        minAge?: number;
        maxAge?: number;
        gender?: string;
        size?: string;
        categoryId?: string;
        search?: string;
    }) {
        const where: any = {};

        if (filters?.species) {
            where.species = filters.species;
        }

        if (filters?.breed) {
            where.breed = { contains: filters.breed, mode: 'insensitive' };
        }

        if (filters?.minAge !== undefined || filters?.maxAge !== undefined) {
            where.age = {};
            if (filters.minAge !== undefined) where.age.gte = filters.minAge;
            if (filters.maxAge !== undefined) where.age.lte = filters.maxAge;
        }

        if (filters?.gender) {
            where.gender = filters.gender;
        }

        if (filters?.size) {
            where.size = filters.size;
        }

        if (filters?.categoryId) {
            where.categoryId = filters.categoryId;
        }

        if (filters?.search) {
            where.OR = [
                { name: { contains: filters.search, mode: 'insensitive' } },
                { breed: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }

        return this.prisma.pet.findMany({
            where,
            include: {
                category: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: string) {
        const pet = await this.prisma.pet.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });

        if (!pet) {
            throw new NotFoundException('Pet not found');
        }

        return pet;
    }

    async create(dto: CreatePetDto) {
        return this.prisma.pet.create({
            data: dto,
            include: {
                category: true,
            },
        });
    }

    async update(id: string, dto: Partial<CreatePetDto>) {
        const pet = await this.prisma.pet.findUnique({ where: { id } });

        if (!pet) {
            throw new NotFoundException('Pet not found');
        }

        return this.prisma.pet.update({
            where: { id },
            data: dto,
            include: {
                category: true,
            },
        });
    }

    async remove(id: string) {
        const pet = await this.prisma.pet.findUnique({ where: { id } });

        if (!pet) {
            throw new NotFoundException('Pet not found');
        }

        await this.prisma.pet.delete({ where: { id } });

        return { message: 'Pet deleted successfully' };
    }
}
