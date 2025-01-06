import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import api from "../utils/api";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from '../components/RecipeModal';

const Home = () => {
    const [isAdmin, setIsAdmin] = useState(false); // Replace with auth check
    const [recipes, setRecipes] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    function fetchRecipes() {
        api.get("/recipes").then((res) => setRecipes(res.data));
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleAdd = () => {
        setIsCreateModalOpen(true);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredRecipes = recipes.filter((recipe) => {
        const searchFields = [
            recipe.title,
            recipe.description,
            recipe.category,
            recipe.ingredients.join(' '),
            recipe.instructions,
            recipe.notes,
        ].join(' ').toLowerCase();
        return searchFields.includes(searchQuery.toLowerCase());
    });

    const handleSave = (newRecipe) => {
        console.log('newRecipe:', newRecipe);
        api.post('/recipes/', newRecipe) // Ensure the correct backend URL
        .then(() => {
            fetchRecipes();
            setIsCreateModalOpen(false);
        })
        .catch((err) => {
            console.error(err);
            setIsCreateModalOpen(false);
        });
    };

    const handleCloseModal = () => {
        setIsCreateModalOpen(false);
    };

    return (
        <div className="p-6">
            <div className="header-container flex items-center justify-between mb-6">
                <div className="flex">
                <input
                        className="mb-0 px-3 rounded-full"
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <button
                    onClick={handleAdd}
                    className="hover:bg-gray-300"
                >
                    <FiPlusCircle size="30" color="rgb(59, 130, 246, 1)" />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes?.map((recipe) => (
                <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                />
                ))}
            </div>
            {isCreateModalOpen && (
                <RecipeModal
                    recipe={'new'}
                    onSave={handleSave}
                    onClose={handleCloseModal}
                    isAdmin={isAdmin}
                />
            )}
        </div>
    );
};

export default Home;
