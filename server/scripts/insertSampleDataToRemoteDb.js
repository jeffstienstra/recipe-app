// filepath: /Users/jeffstienstra/projects/recipe-app/server/scripts/insertSampleData.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('../models/Recipe');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://jeffstienstra:1KbLpZa5zWxtKZQx@recipe-app-0.rucqh.mongodb.net/recipe-app?retryWrites=true&w=majority&appName=recipe-app-0");
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const insertSampleData = async () => {
    await connectDB();

    const sampleRecipes = [
        {
            title: 'Spaghetti Carbonara',
            description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
            cookTime: 20,
            prepTime: 10,
            rating: 5,
            category: 'Entree',
            ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper'],
            instructions: 'Cook spaghetti. In a bowl, mix eggs and cheese. Cook pancetta. Combine all with spaghetti and pepper.',
            image: 'https://example.com/spaghetti.jpg',
            notes: 'Use freshly grated Parmesan cheese for best results.',
        },
        {
            title: 'Chocolate Cake',
            description: 'A rich and moist chocolate cake.',
            cookTime: 30,
            prepTime: 15,
            rating: 4,
            category: 'Dessert',
            ingredients: ['Flour', 'Sugar', 'Cocoa powder', 'Baking powder', 'Eggs', 'Milk', 'Butter'],
            instructions: 'Mix dry ingredients. Add wet ingredients. Bake at 350°F for 30 minutes.',
            image: 'https://example.com/chocolate-cake.jpg',
            notes: 'Let the cake cool before frosting.',
        },
    ];

    try {
        await Recipe.insertMany(sampleRecipes);
        console.log('Sample data inserted successfully');
    } catch (err) {
        console.error('Error inserting sample data:', err);
    } finally {
        mongoose.connection.close();
    }
};

insertSampleData();