import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiEdit2, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import api from "../utils/api";
import './RecipeDetails.css';
import {Button} from "@headlessui/react";

const RecipeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Extract recipe ID from URL
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUser, setIsUser] = useState(null); // Replace with auth check
    const [recipe, setRecipe] = useState(null);
    const [wakeLock, setWakeLock] = useState(null);

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        api.delete(`/recipes/${recipe._id}`) // Ensure the correct backend URL
        .then(() => {
            navigate('/');
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setIsDeleteModalOpen(false);
        });
    };

    useEffect(() => {
        setIsUser(false); // Replace with user auth check
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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		// Clean up wake lock on change or when component unmounts
		return () => {
			if (wakeLock) {
				wakeLock.release()
					.then(() => {
						console.log('Wake Lock released');
						setWakeLock(null);
					})
					.catch((error) => console.error('Failed to release wake lock', error));
			}
		};
	}, [wakeLock]);

	const toggleWakeLock = async () => {
		if (wakeLock) {
            console.log('wakelock:', wakeLock);
			await wakeLock.release();
			setWakeLock(null);
		} else {
			try {
				const newWakeLock = await navigator.wakeLock.request('screen');
            console.log('newWakeLock:', newWakeLock);

				setWakeLock(newWakeLock);
			} catch (error) {
				console.error('Failed to enable wake lock', error);
			}
		}
	};

    if (loading) {
        return (
        <div className="flex-center">
            <p>Loading...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="flex-center">
            <p className="text-red">{error}</p>
            <Button onClick={() => navigate('/')}>Back</Button>

        </div>
        );
    }

    if (!recipe) {
        return (
        <div className="flex-center">
            <p>No recipe found.</p>
            <Button onClick={() => navigate('/')}>Back</Button>
        </div>
        );
    }

    return (
        <div className="recipe-details">
            <div className={(isDeleteModalOpen) ? 'blur-background' : ''}>
                <div className="recipe-detail-header">
                    <Button
                        onClick={() => navigate('/')}
                        className="button button-square"
                    >
                        <FiArrowLeft size={24} />
                    </Button>
                        <div className="cook-mode-container">
                            <label htmlFor="cook-mode-toggle"  className='cook-mode-title'>Cook Mode</label>
                            <div className="cook-mode-toggle" role="group" aria-labelledby="cook-mode-toggle">
                                <h4 aria-hidden="true">Off</h4>
                                <label className="switch">
                                    <input
                                        id="cook-mode-toggle"
                                        type="checkbox"
                                        checked={!!wakeLock}
                                        onChange={toggleWakeLock}
                                        aria-label='Toggle cook mode'onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                toggleWakeLock();
                                            }
                                        }}
                                    />
                                    <span className="slider round"></span>
                                </label>
                                <h4 aria-hidden="true">On</h4>
                            </div>
                        </div>
                        <div className="actions">
                            {!isUser && (
                                <>
                                    <Link
                                        to={`/recipe/edit/${recipe._id}`}
                                        // onClick={() => handleEdit(recipe)}
                                        state={recipe}
                                        className="button button-square"
                                        aria-label="Edit recipe"
                                    >
                                        <FiEdit2 size={24} />
                                    </Link>
                                    <Button
                                        onClick={() => handleDelete(recipe)}
                                        className="button button-square delete"
                                        aria-label="Delete recipe"
                                    >
                                        <FiTrash2 size={24} />
                                    </Button>
                                </>
                            )}
                        </div>
                </div>
                <div className="recipe-detail-image-container">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="recipe-detail-image"
                    />
                    <div className="title-container">
                        <h1 className="single-line-ellipsis">{recipe.title}</h1>
                    </div>
                </div>
                <div className="recipe-detail-content">
                    <p className="description">{recipe.description}</p>
                    <div className="details">
                        <div>
                            <p className="label">Prep Time</p>
                            <p className="value">{recipe.prepTime} mins</p>
                        </div>
                        <div>
                            <p className="label">Cook Time</p>
                            <p className="value">{recipe.cookTime} mins</p>
                        </div>
                        <div>
                            <p className="label">Category</p>
                            <p className="value">{recipe.category}</p>
                        </div>
                    </div>

                    <h2 className="subtitle">Ingredients</h2>
                    <ul className="ingredients">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient}
                            </li>
                        ))}
                    </ul>

                    <h2 className="subtitle">Instructions</h2>
                    <p className="instructions">{recipe.instructions}</p>
                </div>
            </div>
            {isDeleteModalOpen && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal-content">
                        <h2 className="delete-modal-title">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this recipe? This cannot be undone.</p>
                        <div className="delete-modal-buttons">
                            <Button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="button-cancel"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={confirmDelete}
                                className="button-confirm-delete"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetails;