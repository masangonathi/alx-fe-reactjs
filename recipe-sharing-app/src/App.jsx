// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';

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
