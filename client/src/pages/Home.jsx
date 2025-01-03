import { useEffect, useState } from "react";
import api from "../utils/api";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        api.get("/recipes").then((res) => setRecipes(res.data));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-center text-3xl font-bold mb-6">Recipes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                />
                ))}
            </div>
        </div>
    );
};

export default Home;
