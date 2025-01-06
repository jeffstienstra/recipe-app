const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        cookTime: { type: Number },
        prepTime: { type: Number },
        rating: { type: Number, default: 0, max: 5 },
        category: { type: String, enum: ['Appetizer', 'Breakfast', 'Dessert', 'Drink', 'Entree', 'Salad', 'Side'], default: 'Entree' },
        ingredients: { type: [String] },
        instructions: { type: String },
        image: { type: String },
        notes: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Recipe', RecipeSchema);
