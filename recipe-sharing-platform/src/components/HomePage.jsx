import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipesData from '../data/data.json';

function HomePage() {
  // State to hold the recipes
  const [recipes, setRecipes] = useState([]);

  // Load the recipes from the mock data file
  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Recipe Sharing Platform</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-4">{recipe.summary}</p>
              {/* Link to Recipe Detail Page */}
              <Link to={`/recipe/${recipe.id}`} className="text-blue-500 hover:text-blue-700 font-semibold">
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
