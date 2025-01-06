const Recipe = require('../models/Recipe');

exports.getRecipe = async (req, res) => {
    console.log('getRecipe controller hit...');
    console.log('req.params.id:', req.params.id);
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllRecipes = async (req, res) => {
    console.log('getAllRecipes controller hit...');
    try {
        const recipes = await Recipe.find().sort({ updatedAt: -1 });
        // console.log('recipes:', recipes);
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createRecipe = async (req, res) => {
    console.log('createRecipe controller hit...');
    console.log('req.body:', req.body);
    try {
        const newRecipe = new Recipe(req.body);
        const savedRecipe = await newRecipe.save();
        console.log('savedRecipe:', savedRecipe);
        res.status(201).json(savedRecipe);
    } catch (err) {
        console.error('Error saving recipe:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
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

exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json({ message: 'Recipe deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}