import { useEffect, useState } from "react";
import { FiPlusSquare, FiPlusCircle } from "react-icons/fi";
import api from "../utils/api";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from '../components/RecipeModal';
import { Button, Input } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

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
        document.activeElement.blur();
    };

    return (
        <div className="px-6">
            <div className="header-container flex items-center justify-between mb-6">
                <div className="flex">
                <Input
                        className="rounded-lg mb-0 px-3 border data-[hover]:shadow data-[focus]:bg-gray-50"
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                {/* <Button as={Fragment}>
                    {({ hover }) => (
                        <button
                            onClick={handleAdd}
                            className={clsx(hover && 'shadow-md bg-gray-100')}
                        >
                            <FiPlusSquare size="30" color="rgb(59, 130, 246, 1)" />
                        </button>
                    )}
                </Button> */}
                <Button className="rounded-full hover:shadow-md hover:bg-gray-50" onClick={handleAdd}>
                    <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        color="rgb(59, 130, 246, 1)"
                        height="30"
                        width="30"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: 'rgb(59, 130, 246)' }}
                    >
                        <circle cx="12" cy="12" r="11"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                </Button>
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
