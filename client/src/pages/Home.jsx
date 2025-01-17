import './Home.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import api from "../utils/api";
import RecipeCard from "../components/RecipeCard";
import { Input } from '@headlessui/react'

const Home = () => {
    const [isUser, setIsUser] = useState(null); // Replace with auth check
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [joke, setJoke] = useState('');

    useEffect(() => {
        setIsUser(false); // Replace with user auth check

        function fetchDadJoke() {
            fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent':  'JustGiveMeTheRecipe.com',
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setJoke(data?.joke);
            })
        }

        async function fetchRecipes() {
            setIsFetchingData(true);

            const jokeTimeout = setTimeout(() => {
                fetchDadJoke();
            }, 2000);

            try {
                const res = await api.get('/recipes/');
                clearTimeout(jokeTimeout); // Clear the timeout if fetchRecipes resolves quickly
                setRecipes(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsFetchingData(false);
            }
        }
        fetchRecipes();
    }, []);

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

    return (
        <div className="home-container">
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
                {!isUser && (
                    <Link to={'/recipe/new'} className="button button-square"><FiPlus size={24} /></Link>
                )}
            </div>
            {isFetchingData ? (
                <>
                    <p>The server is starting up...</p>
                    {joke && (
                        <div className="loading-container">
                            <p>Hey, have you heard this one?</p>
                            <h4>{joke}</h4>
                        </div>
                    )}
                </>
            ) : (
                <div className="grid">
                    {filteredRecipes?.map((recipe) => (
                        <RecipeCard
                            key={recipe._id}
                            recipe={recipe}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
