const express = require('express');
const {getAllRecipes, createRecipe, updateRecipe} = require('../controllers/recipeController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();
const Recipe = require('../models/Recipe');


router.get('/', getAllRecipes);
router.post('/', protect, adminOnly, createRecipe);
router.put('/:id', updateRecipe);

router.get("/:id", async (req, res) => {
    try {
        console.log('req.params', req.params);
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
