const express = require('express');
const {getRecipe, getAllRecipes, createRecipe, updateRecipe, deleteRecipe} = require('../controllers/recipeController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();
const Recipe = require('../models/Recipe');


router.get('/', getAllRecipes);
// router.post('/', protect, adminOnly, createRecipe);
router.get("/:id", getRecipe);
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
