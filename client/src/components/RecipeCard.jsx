import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="recipe-card">
            <img
                src={recipe?.image}
                alt={recipe?.title}
            />
            <div className="content">
                <h2 className="title">{recipe?.title}</h2>
                <div className="details">
                    <p>{recipe?.category}</p>
                    <p>{`Prep Time: ${recipe?.prepTime}`}</p>
                    <p>{`Cook Time: ${recipe?.cookTime}`}</p>
                </div>
            </div>
            <Link
                to={`/recipe/${recipe?._id}`}
                className="view-recipe"
            >
                View Recipe
            </Link>
        </div>
    );
};

export default RecipeCard;