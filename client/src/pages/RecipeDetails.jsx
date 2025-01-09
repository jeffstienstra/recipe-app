import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit2, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import api from "../utils/api";
import RecipeModal from "../components/RecipeModal";

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

    // const handleDelete = (recipe) => {
    //     api.delete(`/recipes/${recipe._id}`) // Ensure the correct backend URL
    //     .then(() => {
    //         navigate('/');
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     });
    // };

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
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-500">{error}</p>
        </div>
        );
    }

    if (!recipe) {
        return (
        <div className="flex items-center justify-center min-h-screen">
            <p>No recipe found.</p>
        </div>
        );
    }

    return (
        <div className="mt-0 p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <div className="flex justify-between mb-4 text-gray-700">
                <button
                    onClick={() => navigate('/')}
                    className="pb-2 rounded hover:bg-gray-300"
                >
                    <FiArrowLeft size={28} />
                </button>
                {!isAdmin && (
                    <div className="flex">
                        <button
                            onClick={() => handleEdit(recipe)}
                            className="pb-2 hover:bg-gray-300"
                            >
                            <FiEdit2 size={24} />
                        </button>
                        <button
                            onClick={() => handleDelete(recipe)}
                            className="ml-8 pb-2 hover:bg-gray-300"
                            >
                            <FiTrash2 color='red' size={24} />
                        </button>
                    </div>
                )}
            </div>
            <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <p className="text-gray-600 mb-6">{recipe.description}</p>

            <div className="flex justify-between mb-6">
                <div>
                <p className="text-sm text-gray-500">Prep Time</p>
                <p className="font-bold">{recipe.prepTime} mins</p>
                </div>
                <div>
                <p className="text-sm text-gray-500">Cook Time</p>
                <p className="font-bold">{recipe.cookTime} mins</p>
                </div>
                <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-bold">{recipe.category}</p>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul className="list-disc list-inside mb-6">
                {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                    {ingredient}
                </li>
                ))}
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
            {editingRecipe && (
                <RecipeModal
                recipe={editingRecipe}
                onSave={handleSave}
                onClose={() => setEditingRecipe(null)}
                isAdmin={isAdmin}
                />
            )}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this recipe?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded"
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
