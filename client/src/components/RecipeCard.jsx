import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiPlus } from 'react-icons/fi';
import './RecipeCard.css';
import {Button} from '@headlessui/react';

const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate();

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