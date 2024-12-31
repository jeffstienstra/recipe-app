const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ updatedAt: -1 });
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createRecipe = async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate
        (req.params.id, req.body, { new: true });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json(recipe);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
