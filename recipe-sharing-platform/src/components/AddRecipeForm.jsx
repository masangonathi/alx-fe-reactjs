import { useState } from 'react';

function AddRecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!title || !ingredients || !instructions) {
      setError('Please fill out all fields.');
      return;
    }

    // Format ingredients and instructions as arrays
    const formattedIngredients = ingredients.split(',').map(item => item.trim());
    const formattedInstructions = instructions.split('.').map(step => step.trim());

    const newRecipe = {
      id: Math.floor(Math.random() * 1000), // Random ID for demonstration
      title,
      ingredients: formattedIngredients,
      instructions: formattedInstructions,
      summary: "Newly added recipe"
    };

    onAddRecipe(newRecipe);

    // Clear the form
    setTitle('');
    setIngredients('');
    setInstructions('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="title" className="block text-lg font-semibold">Recipe Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-lg p-2"
          placeholder="Enter the recipe title"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="ingredients" className="block text-lg font-semibold">Ingredients (comma separated)</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-lg p-2"
          placeholder="Enter ingredients separated by commas"
          rows="4"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="instructions" className="block text-lg font-semibold">Preparation Steps (separated by periods)</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-lg p-2"
          placeholder="Enter steps separated by periods"
          rows="4"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Add Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;
