import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <img
                src={recipe?.image}
                alt={recipe?.title}
                className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="mt-4">
                <h2 className="text-xl font-semibold">{recipe?.title}</h2>
                <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">{recipe?.category}</p>
                    <p className="text-sm text-gray-500">{`Prep Time: ${recipe?.prepTime}`}</p>
                    <p className="text-sm text-gray-500">{`Cook Time: ${recipe?.cookTime}`}</p>
                </div>
            </div>
            <Link
                to={`/recipe/${recipe?._id}`}
                className="block mt-4 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
                View Recipe
            </Link>
        </div>
    );
};

export default RecipeCard;
