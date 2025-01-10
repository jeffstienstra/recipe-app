import './Home.css';
import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import api from "../utils/api";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from '../components/RecipeModal';
import { Button, Input } from '@headlessui/react'

const Home = () => {
    const [isAdmin, setIsAdmin] = useState(false); // Replace with auth check
    const [recipes, setRecipes] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(null);
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
        document.querySelector('#focus-reset').focus();
    };

    return (
        <div className="home-container">
            <div className={(isCreateModalOpen) ? 'blur-background' : ''}>
                <div className="header-container">
                    <div id='focus-reset' tabIndex="-1" className="focus-reset">
                        <Input
                            className="input"
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <Button className="button" onClick={handleAdd}>
                        <FiPlusCircle size="30" color="rgb(59, 130, 246, 1)" />
                    </Button>
                </div>
                <div className="grid">
                    {filteredRecipes?.map((recipe) => (
                        <RecipeCard
                            key={recipe._id}
                            recipe={recipe}
                        />
                    ))}
                </div>
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
