import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import recipeData from '../data.json'; // Mock data

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const selectedRecipe = recipeData.find((r) => r.id === parseInt(id));
    if (selectedRecipe) {
      setRecipe(selectedRecipe);
    }
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl sm:text-lg md:text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 sm:h-48 md:h-64 object-cover mb-4 rounded-lg shadow-md" />
      <p className="text-lg mb-4">{recipe.summary}</p>
      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc pl-6 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Cooking Instructions</h2>
      <ol className="list-decimal pl-6">
        {recipe.instructions.map((step, index) => (
          <li key={index} className="mb-2">{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetail;
