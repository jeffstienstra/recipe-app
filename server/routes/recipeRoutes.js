const express = require('express');
const {getRecipe, getAllRecipes, createRecipe, updateRecipe} = require('../controllers/recipeController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();
const Recipe = require('../models/Recipe');


router.get('/', getAllRecipes);
router.post('/', protect, adminOnly, createRecipe);
router.put('/:id', updateRecipe);

router.get("/:id", getRecipe);

module.exports = router;
