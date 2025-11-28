import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { CategoriesModule } from './categories/categories.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UploadModule } from './upload/upload.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        AuthModule,
        PetsModule,
        CategoriesModule,
        FavoritesModule,
        UploadModule,
    ],
})
export class AppModule { }
