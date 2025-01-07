import { useState } from 'react';

const RecipeModal = ({ recipe, onSave, onClose }) => {

    const modalTitle = recipe === 'new' ? 'Create Recipe' : 'Edit Recipe';

    const [formData, setFormData] = useState(
        recipe === 'new' ? {
            title: '',
            description: '',
            cookTime: '',
            prepTime: '',
            rating: '',
            category: 'Entree',
            ingredients: '',
            instructions: '',
            image: '',
            notes: '',
        } : {
            _id: recipe._id,
            title: recipe.title || '',
            description: recipe.description || '',
            cookTime: recipe.cookTime || '',
            prepTime: recipe.prepTime || '',
            rating: recipe.rating || '',
            category: recipe.category || 'Entree',
            ingredients: recipe.ingredients.join(', ') || '',
            instructions: recipe.instructions || '',
            image: recipe.image || '',
            notes: recipe.notes || '',
        }
    );

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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center overflow-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 min-w-[350px] max-h-fit overflow-y-auto my-10">
                <h2 className="text-2xl font-bold mb-4">{modalTitle}</h2>
                <label htmlFor="title" className="block font-semibold">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="mb-4 w-full p-2 border rounded"
                />
                <label htmlFor="description" className="block font-semibold">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full min-h-16 p-2 border rounded"
                />
                <label htmlFor="cookTime" className="block font-semibold">Cook Time</label>
                <input
                    type="number"
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleChange}
                    placeholder="Cook Time"
                    className="w-full p-2 border rounded"
                />
                <label htmlFor="prepTime" className="block font-semibold">Prep Time</label>
                <input
                    type="number"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleChange}
                    placeholder="Prep Time"
                    className="w-full p-2 border rounded"
                />
                <label htmlFor="rating" className="block font-semibold">Rating</label>
                <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="Rating"
                    className="w-full p-2 border rounded"
                />
                <label htmlFor="category" className="block font-semibold">Category</label>
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
                </select>
                <label htmlFor="ingredients" className="block font-semibold">Ingredients</label>
                <textarea
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    placeholder="Ingredients (comma separated)"
                    className="w-full p-2 border rounded"
                />
                <label htmlFor="instructions" className="block font-semibold">Instructions</label>
                <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="Instructions"
                    className="w-full p-2 border rounded"
                />
                <label htmlFor="image" className="block font-semibold">Image</label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full p-2 border rounded"
                />
                <label htmlFor="notes" className="block font-semibold">Notes</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Notes"
                    className="w-full p-2 border rounded"
                />
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