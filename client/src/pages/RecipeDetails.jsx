import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit2, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import api from "../utils/api";
import RecipeModal from "../components/RecipeModal";
import './RecipeDetails.css';
import {Button} from "@headlessui/react";

const RecipeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Extract recipe ID from URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recipeToEdit, setRecipeToEdit] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Replace with auth check
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState(null);

    const handleEdit = (recipe) => setRecipeToEdit(recipe);

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
            setRecipeToEdit(null);
        })
        .catch((err) => {
            console.error(err);
            setRecipeToEdit(null);
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
            <Button onClick={() => navigate('/')}>Back</Button>
        </div>
        );
    }

    if (error) {
        return (
        <div className="flex-center">
            <p className="text-red">{error}</p>
            <Button onClick={() => navigate('/')}>Back</Button>

        </div>
        );
    }

    if (!recipe) {
        return (
        <div className="flex-center">
            <p>No recipe found.</p>
            <Button onClick={() => navigate('/')}>Back</Button>
        </div>
        );
    }

    return (
        <div className="recipe-details">
            <div className={(isDeleteModalOpen || recipeToEdit) ? 'blur-background' : ''}>
                <div className="recipe-detail-header">
                    <Button
                        onClick={() => navigate('/')}
                        className="button button-square"
                    >
                        <FiArrowLeft size={24} />
                    </Button>
                    {!isAdmin && (
                        <div className="actions">
                            <Button
                                onClick={() => handleEdit(recipe)}
                                className="button button-square"
                            >
                                <FiEdit2 size={24} />
                            </Button>
                            <Button
                                onClick={() => handleDelete(recipe)}
                                className="button button-square delete"
                            >
                                <FiTrash2 size={24} />
                            </Button>
                        </div>
                    )}
                </div>
                <div className="recipe-detail-image-container">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="recipe-detail-image"
                    />
                </div>
                <div className="recipe-detail-content">
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
            </div>
            {isDeleteModalOpen && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal-content">
                        <h2 className="delete-modal-title">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this recipe? This cannot be undone.</p>
                        <div className="delete-modal-buttons">
                            <Button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="button-cancel"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={confirmDelete}
                                className="button-confirm-delete"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        {recipeToEdit && (
            <RecipeModal
                recipe={recipeToEdit}
                onSave={handleSave}
                onClose={() => setRecipeToEdit(null)}
                isAdmin={isAdmin}
            />
        )}
        </div>
    );
};

export default RecipeDetails;