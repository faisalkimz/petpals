import { IsString, IsNotEmpty, IsInt, IsNumber, IsArray, Min } from 'class-validator';

export class CreatePetDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    species: string;

    @IsString()
    @IsNotEmpty()
    breed: string;

    @IsInt()
    @Min(0)
    age: number;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsString()
    @IsNotEmpty()
    size: string;

    @IsNumber()
    @Min(0)
    distance: number;

    @IsInt()
    @Min(0)
    price: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @IsString({ each: true })
    images: string[];

    @IsString()
    @IsNotEmpty()
    shelter: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsString()
    @IsNotEmpty()
    categoryId: string;
}
