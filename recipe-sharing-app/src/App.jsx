// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import { useRecipeStore } from './components/recipeStore';


const App = () => {
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div>
      <h1>Recipe Sharing App</h1>
      <FavoritesList />
      <RecommendationsList />
    </div>

  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={RecipeList} />
        <Route path="/recipe/:id" component={RecipeDetails} />
        <Route path="/add-recipe" component={AddRecipeForm} />
    </Routes>
    </Router>
  );
}

export default App;
