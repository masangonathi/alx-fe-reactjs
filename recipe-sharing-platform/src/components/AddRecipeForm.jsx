import { useState } from 'react';

function AddRecipeForm({ onAddRecipe }) {
  // Form state
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  
  // Error state to handle validation errors
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    let tempErrors = {};
    
    if (!title) tempErrors.title = "Title is required";
    if (!ingredients) tempErrors.ingredients = "Ingredients are required";
    if (ingredients && ingredients.split(',').length < 2) tempErrors.ingredients = "At least 2 ingredients are required";
    if (!instructions) tempErrors.instructions = "Instructions are required";
    if (instructions && instructions.split('.').length < 2) tempErrors.instructions = "At least 2 steps are required";
    
    setErrors(tempErrors);

    // If the object is empty, validation passed
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (!validate()) return;

    // If validation passes, proceed to format the data
    const formattedIngredients = ingredients.split(',').map(item => item.trim());
    const formattedInstructions = instructions.split('.').map(step => step.trim());

    const newRecipe = {
      id: Math.floor(Math.random() * 1000), // Random ID for demonstration
      title,
      ingredients: formattedIngredients,
      instructions: formattedInstructions,
      summary: "Newly added recipe"
    };

    // Pass the new recipe to the parent component
    onAddRecipe(newRecipe);

    // Clear the form fields after submission
    setTitle('');
    setIngredients('');
    setInstructions('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>

      {/* Display form validation errors */}
      {errors.title && <p className="text-red-500 mb-4">{errors.title}</p>}
      {errors.ingredients && <p className="text-red-500 mb-4">{errors.ingredients}</p>}
      {errors.instructions && <p className="text-red-500 mb-4">{errors.instructions}</p>}

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
