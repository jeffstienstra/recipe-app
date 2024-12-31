import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit2, FiArrowLeftCircle } from "react-icons/fi";
import api from "../utils/api";
import RecipeModal from "../components/RecipeModal";
import axios from "axios";

const RecipeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Extract recipe ID from URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingRecipe, setEditingRecipe] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Replace with auth check

    const handleEdit = (recipe) => setEditingRecipe(recipe);

    const handleSave = (updatedRecipe) => {
        api.put(`/recipes/${updatedRecipe._id}`, updatedRecipe) // Ensure the correct backend URL
        .then((res) => {
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
        <div className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <div className="flex justify-between text-gray-700">
                <button
                    onClick={() => navigate('/')}
                    className="pb-2 rounded hover:bg-gray-300"
                >
                    <FiArrowLeftCircle size={28} />
                </button>
                {!isAdmin && (
                <button
                    onClick={() => handleEdit(recipe)}
                    className="pb-2 hover:bg-gray-300"
                    >
                    <FiEdit2 size={24} />
                </button>
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
                // onEdit={handleEdit}
                isAdmin={isAdmin}
                />
            )}
        </div>
    );
};

export default RecipeDetails;
