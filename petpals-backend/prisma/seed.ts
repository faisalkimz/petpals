import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create sample user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.upsert({
        where: { email: 'demo@petpals.com' },
        update: {},
        create: {
            email: 'demo@petpals.com',
            password: hashedPassword,
            name: 'Justine Demo',
        },
    });

    console.log('✅ Created user:', user.email);

    // Create categories
    const categories = [
        { name: 'Dog', icon: '🐕' },
        { name: 'Cat', icon: '🐱' },
        { name: 'Birds', icon: '🦜' },
        { name: 'Fish', icon: '🐠' },
        { name: 'Rabbit', icon: '🐰' },
    ];

    const createdCategories = [];
    for (const cat of categories) {
        const category = await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: cat,
        });
        createdCategories.push(category);
    }

    console.log('✅ Created categories');

    // Create sample pets
    const dogCategory = createdCategories.find((c) => c.name === 'Dog');
    const catCategory = createdCategories.find((c) => c.name === 'Cat');
    const birdCategory = createdCategories.find((c) => c.name === 'Birds');

    const pets = [
        {
            name: 'Luna',
            species: 'Dog',
            breed: 'Siberian Husky',
            age: 36,
            gender: 'Male',
            size: 'Large',
            distance: 0.9,
            price: 820,
            description:
                'Luna is a majestic Husky who adores being in a quiet and calm environment. Luna is best suited for white-collar faces walks, and cuddles. She is family-friendly with kids, and dreams of a loving family who loves adventures, He is gentle type and calm nature make her impossible to resist.',
            images: [
                'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800',
                'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800',
            ],
            shelter: 'Siberian Husky Adult',
            tags: ['Good with kids', 'Energetic', 'Loyal', 'Fluffy'],
            categoryId: dogCategory!.id,
        },
        {
            name: 'Max',
            species: 'Dog',
            breed: 'Golden Retriever',
            age: 24,
            gender: 'Male',
            size: 'Large',
            distance: 1.2,
            price: 650,
            description:
                'Max is a friendly and playful Golden Retriever who loves to fetch and swim. He is great with children and other pets, making him the perfect family companion.',
            images: [
                'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800',
                'https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=800',
            ],
            shelter: 'Happy Paws Shelter',
            tags: ['Friendly', 'Playful', 'Good with kids', 'Trained'],
            categoryId: dogCategory!.id,
        },
        {
            name: 'Bella',
            species: 'Dog',
            breed: 'French Bulldog',
            age: 18,
            gender: 'Female',
            size: 'Small',
            distance: 2.5,
            price: 950,
            description:
                'Bella is a charming French Bulldog with a big personality. She loves cuddles on the couch and short walks in the park.',
            images: [
                'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
                'https://images.unsplash.com/photo-1615549382994-3c6e0b1b7c8e?w=800',
            ],
            shelter: 'City Pet Adoption',
            tags: ['Affectionate', 'Low exercise', 'Apartment friendly'],
            categoryId: dogCategory!.id,
        },
        {
            name: 'Charlie',
            species: 'Dog',
            breed: 'Beagle',
            age: 30,
            gender: 'Male',
            size: 'Medium',
            distance: 1.8,
            price: 550,
            description:
                'Charlie is an energetic Beagle who loves to explore. He has a great nose and would be perfect for an active family.',
            images: [
                'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800',
                'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800',
            ],
            shelter: 'Beagle Rescue Center',
            tags: ['Active', 'Curious', 'Good with kids', 'Vocal'],
            categoryId: dogCategory!.id,
        },
        {
            name: 'Milo',
            species: 'Cat',
            breed: 'Orange Tabby',
            age: 20,
            gender: 'Male',
            size: 'Medium',
            distance: 1.5,
            price: 350,
            description:
                'Milo is a beautiful orange tabby with striking golden eyes. He loves to play with feather toys and enjoys sunny windowsills.',
            images: [
                'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
                'https://images.unsplash.com/photo-1573865526739-10c1d3a0bf09?w=800',
            ],
            shelter: 'Feline Friends Rescue',
            tags: ['Playful', 'Independent', 'Affectionate', 'Indoor'],
            categoryId: catCategory!.id,
        },
        {
            name: 'Whiskers',
            species: 'Cat',
            breed: 'Persian',
            age: 28,
            gender: 'Female',
            size: 'Medium',
            distance: 2.1,
            price: 600,
            description:
                'Whiskers is a gentle Persian cat with a luxurious coat. She prefers a calm environment and loves to be pampered.',
            images: [
                'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800',
                'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800',
            ],
            shelter: 'Persian Cat Sanctuary',
            tags: ['Calm', 'Quiet', 'Gentle', 'Requires grooming'],
            categoryId: catCategory!.id,
        },
        {
            name: 'Shadow',
            species: 'Cat',
            breed: 'Black Domestic',
            age: 15,
            gender: 'Male',
            size: 'Small',
            distance: 0.7,
            price: 250,
            description:
                'Shadow is a sleek black cat with a mysterious charm. He is very affectionate once he gets to know you.',
            images: [
                'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800',
                'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?w=800',
            ],
            shelter: 'Black Cat Rescue',
            tags: ['Shy at first', 'Sweet', 'Good with adults', 'Quiet'],
            categoryId: catCategory!.id,
        },
        {
            name: 'Coco',
            species: 'Birds',
            breed: 'Cockatiel',
            age: 10,
            gender: 'Female',
            size: 'Small',
            distance: 3.2,
            price: 180,
            description:
                'Coco is a friendly cockatiel who loves to whistle and interact with people. She would make a wonderful companion.',
            images: [
                'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
                'https://images.unsplash.com/photo-1580771614215-cd6e35d15f47?w=800',
            ],
            shelter: 'Avian Adoption Center',
            tags: ['Social', 'Vocal', 'Intelligent', 'Requires attention'],
            categoryId: birdCategory!.id,
        },
        {
            name: 'Buddy',
            species: 'Dog',
            breed: 'Labrador',
            age: 40,
            gender: 'Male',
            size: 'Large',
            distance: 1.0,
            price: 500,
            description:
                'Buddy is a loyal and loving Labrador who adores his humans. He is well-trained and perfect for families.',
            images: [
                'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
                'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
            ],
            shelter: 'Labrador Lovers Rescue',
            tags: ['Loyal', 'Trained', 'Good with kids', 'Active'],
            categoryId: dogCategory!.id,
        },
        {
            name: 'Daisy',
            species: 'Dog',
            breed: 'Pomeranian',
            age: 12,
            gender: 'Female',
            size: 'Small',
            distance: 2.8,
            price: 750,
            description:
                'Daisy is a fluffy Pomeranian with a big personality. She loves to be the center of attention.',
            images: [
                'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800',
                'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800',
            ],
            shelter: 'Small Breed Rescue',
            tags: ['Energetic', 'Fluffy', 'Vocal', 'Companion'],
            categoryId: dogCategory!.id,
        },
    ];

    for (const pet of pets) {
        await prisma.pet.upsert({
            where: { id: 'dummy-id-' + pet.name.toLowerCase() },
            update: {},
            create: pet,
        });
    }

    console.log('✅ Created', pets.length, 'pets');
    console.log('🌱 Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
