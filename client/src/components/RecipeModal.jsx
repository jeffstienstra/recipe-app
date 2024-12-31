import React, { useState } from 'react';

const RecipeModal = ({ recipe, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        _id: recipe._id || '',
        title: recipe.title || '',
        description: recipe.description || '',
        cookTime: recipe.cookTime || '',
        prepTime: recipe.prepTime || '',
        rating: recipe.rating || '',
        category: recipe.category || '',
        ingredients: recipe.ingredients.join(', ') || '',
        instructions: recipe.instructions || '',
        image: recipe.image || '',
        notes: recipe.notes || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        const updatedRecipe = {
            ...formData,
            ingredients: formData.ingredients.split(',').map(ingredient => ingredient.trim())
        };
        onSave(updatedRecipe);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="cookTime"
                        value={formData.cookTime}
                        onChange={handleChange}
                        placeholder="Cook Time"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="prepTime"
                        value={formData.prepTime}
                        onChange={handleChange}
                        placeholder="Prep Time"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Rating"
                        className="w-full p-2 border rounded"
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Category</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Drink">Drink</option>
                        <option value="Entree">Entree</option>
                        <option value="Salad">Salad</option>
                        <option value="Side">Side</option>
                        <option value="Snack">Snack</option>
                    </select>
                    <textarea
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        placeholder="Ingredients (comma separated)"
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        placeholder="Instructions"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Notes"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;