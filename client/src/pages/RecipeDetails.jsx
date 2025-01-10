import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit2, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import api from "../utils/api";
import RecipeModal from "../components/RecipeModal";
import './RecipeDetails.css';

const RecipeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Extract recipe ID from URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingRecipe, setEditingRecipe] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Replace with auth check
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState(null);

    const handleEdit = (recipe) => setEditingRecipe(recipe);

    const handleDelete = (recipe) => {
        setRecipeToDelete(recipe);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        api.delete(`/recipes/${recipeToDelete._id}`) // Ensure the correct backend URL
        .then(() => {
            navigate('/');
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setIsDeleteModalOpen(false);
            setRecipeToDelete(null);
        });
    };

    const handleSave = (updatedRecipe) => {
        api.put(`/recipes/${updatedRecipe._id}`, updatedRecipe) // Ensure the correct backend URL
        .then(() => {
            setRecipe(updatedRecipe);
            setEditingRecipe(null);
        })
        .catch((err) => {
            console.error(err);
            setEditingRecipe(null);
        });
    };

    useEffect(() => {
        const fetchRecipe = async () => {
        try {
            const res = await api.get(`/recipes/${id}`);
            setRecipe(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch recipe details.");
            setLoading(false);
        }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
        <div className="flex-center">
            <p>Loading...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="flex-center">
            <p className="text-red">{error}</p>
        </div>
        );
    }

    if (!recipe) {
        return (
        <div className="flex-center">
            <p>No recipe found.</p>
        </div>
        );
    }

    return (
        <div className="recipe-details">
            <div className={(isDeleteModalOpen || editingRecipe) ? 'blur-background' : ''}>
                <div className="header">
                    <button
                        onClick={() => navigate('/')}
                        className="button-back"
                    >
                        <FiArrowLeft size={28} />
                    </button>
                    {!isAdmin && (
                        <div className="actions">
                            <button
                                onClick={() => handleEdit(recipe)}
                                className="button-edit"
                            >
                                <FiEdit2 size={24} />
                            </button>
                            <button
                                onClick={() => handleDelete(recipe)}
                                className="button-delete"
                            >
                                <FiTrash2 color='red' size={24} />
                            </button>
                        </div>
                    )}
                </div>
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="image"
                />
                <h1 className="title">{recipe.title}</h1>
                <p className="description">{recipe.description}</p>

                <div className="details">
                    <div>
                        <p className="label">Prep Time</p>
                        <p className="value">{recipe.prepTime} mins</p>
                    </div>
                    <div>
                        <p className="label">Cook Time</p>
                        <p className="value">{recipe.cookTime} mins</p>
                    </div>
                    <div>
                        <p className="label">Category</p>
                        <p className="value">{recipe.category}</p>
                    </div>
                </div>

                <h2 className="subtitle">Ingredients</h2>
                <ul className="ingredients">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient}
                        </li>
                    ))}
                </ul>

                <h2 className="subtitle">Instructions</h2>
                <p className="instructions">{recipe.instructions}</p>
            </div>
            {editingRecipe && (
                <RecipeModal
                    recipe={editingRecipe}
                    onSave={handleSave}
                    onClose={() => setEditingRecipe(null)}
                    isAdmin={isAdmin}
                />
            )}
            {isDeleteModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this recipe?</p>
                        <div className="modal-buttons">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="button-cancel"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="button-confirm-delete"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetails;