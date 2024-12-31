const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        cookTime: { type: Number, required: true },
        prepTime: { type: Number, required: true },
        rating: { type: Number, default: 0, max: 5 },
        category: { type: String, enum: ['Appetizer', 'Breakfast', 'Dessert', 'Drink', 'Entree', 'Salad', 'Side'], required: true },
        ingredients: { type: [String], required: true },
        instructions: { type: String, required: true },
        image: { type: String, required: true },
        notes: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Recipe', RecipeSchema);