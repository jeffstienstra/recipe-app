import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {TfiClose} from 'react-icons/tfi';
import api from "../utils/api";
import './RecipeModal.css';

const RecipeModal = () => {
    const location = useLocation();
    const recipe = location.state;
    console.log('recipe', recipe);
    const navigate = useNavigate();
    const modalTitle = recipe === null ? 'Create Recipe' : 'Edit Recipe';
    const [formData, setFormData] = useState(
        (recipe === null) ? {
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

    const updateRecipe = (updatedRecipe) => {
        api.put(`/recipes/${updatedRecipe._id}`, updatedRecipe) // Ensure the correct backend URL
        .then(() => {
            navigate(`/recipe/${updatedRecipe._id}`);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    const saveNewRecipe = (newRecipe) => {
        api.post('/recipes/', newRecipe)
        .then((res) => {
            console.log('res.data', res.data);
            navigate(`/recipe/${res?.data?._id}`);
        })
        .catch((err) => {
            console.error(err);
            // navigate('/');
        });
    };

    const handleClose = () => {
        console.log('recipe', recipe);
        recipe === null ? navigate('/') : navigate(`/recipe/${recipe._id}`);
    }

    const handleSave = () => {
        const updatedRecipe = {
            ...formData,
            ingredients: formData.ingredients.split(',').map(ingredient => ingredient.trim())
        };
        console.log('updatedRecipe', updatedRecipe);
        recipe === null ? saveNewRecipe(updatedRecipe) : updateRecipe(updatedRecipe)
    };

    return (
        <div className="recipe-modal-overlay">
            <div className="recipe-modal">
                <div className="modal-header">
                    <h2 className="modal-title">{modalTitle}</h2>
                    <button
                        onClick={handleClose}
                        className="button button-square"
                        >
                        <span className='close-icon'><TfiClose size={24} /></span>
                    </button>
                </div>
                <div className="modal-content">
                    <label htmlFor="title" className="label">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="input"
                        autoFocus
                    />
                    <label htmlFor="description" className="label">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="textarea"
                    />
                    <label htmlFor="cookTime" className="label">Cook Time</label>
                    <input
                        type="number"
                        name="cookTime"
                        value={formData.cookTime}
                        onChange={handleChange}
                        placeholder="Cook Time"
                        className="input"
                    />
                    <label htmlFor="prepTime" className="label">Prep Time</label>
                    <input
                        type="number"
                        name="prepTime"
                        value={formData.prepTime}
                        onChange={handleChange}
                        placeholder="Prep Time"
                        className="input"
                    />
                    <label htmlFor="rating" className="label">Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Rating"
                        className="input"
                    />
                    <label htmlFor="category" className="label">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="select"
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
                    <label htmlFor="ingredients" className="label">Ingredients</label>
                    <textarea
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        placeholder="Ingredients (comma separated)"
                        className="textarea"
                    />
                    <label htmlFor="instructions" className="label">Instructions</label>
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        placeholder="Instructions"
                        className="textarea"
                    />
                    <label htmlFor="image" className="label">Image</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="input"
                    />
                    <label htmlFor="notes" className="label">Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Notes"
                        className="textarea"
                    />
                </div>
                <div className="modal-footer">
                    <button
                        onClick={handleClose}
                        className="button button-cancel"
                        >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="button button-save"
                        >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;