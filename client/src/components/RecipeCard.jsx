import { Link, useNavigate } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({recipe}) => {
    return (
            <Link to={`/recipe/${recipe?._id}`} className="recipe-card-link">
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
                </div>
            </Link>
        );
};

export default RecipeCard;