import React, { useState } from 'react';
import recipesData from '../data.json';
import AddRecipeForm from './AddRecipeForm';

function HomePage() {
    const [recipes, setRecipes] = useState(recipeData);

    const handleAddRecipe = (newRecipe) => {
        setRecipes([...recipes, newRecipe]);
      };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Recipe Sharing Platform</h1>

      <AddRecipeForm onAddRecipe={handleAddRecipe} />

      <div className="grid md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
            <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover rounded-t-lg" />
            <h2 className="text-xl font-semibold mt-4">{recipe.title}</h2>
            <p className="text-gray-600 mt-2">{recipe.summary}</p>
            <a href={`/recipes/${recipe.id}`} className="text-blue-500 mt-4 block">View Recipe</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
