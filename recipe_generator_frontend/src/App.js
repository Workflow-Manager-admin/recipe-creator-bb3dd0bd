import React, { useState, useEffect } from 'react';
import './App.css';

// PUBLIC_INTERFACE
/**
 * Main App component for Recipe Generator.
 * Features:
 *  - Branded header
 *  - Recipe generation form (with custom ingredient input)
 *  - Card-style display of generated recipes
 *  - Light modern styling with responsive layout and themed colors
 */
function App() {
  // State for theme and recipes
  const [theme] = useState('light');  // Only light mode per requirements
  const [ingredientInput, setIngredientInput] = useState('');
  const [generatedRecipes, setGeneratedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Set (light) theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  /**
   * Handles recipe generation form submit.
   * For initial implementation, recipes are mocked.
   * @param {Event} e
   */
  const handleGenerateRecipe = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple local "generation" for now (should plug into backend API)
    setTimeout(() => {
      const query = ingredientInput.trim();
      let baseRecipe = {
        title: 'Custom Vegetable Stir Fry',
        ingredients: query
          ? query.split(',').map(ing => ing.trim()).filter(Boolean)
          : ['Carrots', 'Broccoli', 'Onions', 'Garlic', 'Soy Sauce'],
        instructions: query
          ? `Mix all your ingredients (${query}) in a wok, stir-fry with a touch of oil, and season to taste!`
          : 'Chop all vegetables, stir-fry in a large pan with garlic until tender, add soy sauce and serve hot.',
        accent: true
      };

      // Mock several recipes as "generated"
      const mockRecipes = [
        {
          ...baseRecipe,
          title: 'Quick ' + (query || 'Veggie') + ' Bowl',
          accent: false,
        },
        {
          ...baseRecipe,
          title: (query ? 'Fresh ' + query.split(',')[0].trim() : 'Broccoli') + ' Power Salad',
          accent: false,
        },
        baseRecipe, // highlight first result
      ];
      setGeneratedRecipes(mockRecipes);
      setLoading(false);
    }, 700);
  };

  // PUBLIC_INTERFACE
  /**
   * Handles updates to the ingredient input field.
   * @param {Event} e
   */
  const handleIngredientChange = (e) => {
    setIngredientInput(e.target.value);
  };

  // Branding: app title and tagline
  const Branding = () => (
    <header className="app-header-bar">
      <span className="app-logo" aria-label="recipe" role="img">🥗</span>
      <span className="app-brand">RecipeGenie</span>
      <span className="app-tagline">Your AI Recipe Generator</span>
    </header>
  );

  // Recipe generation form
  const RecipeForm = () => (
    <form className="recipe-form" onSubmit={handleGenerateRecipe}>
      <label htmlFor="ingredients" className="form-label">
        Ingredients (comma separated):
      </label>
      <input
        className="form-input"
        id="ingredients"
        type="text"
        value={ingredientInput}
        onChange={handleIngredientChange}
        placeholder="e.g. chicken, tomatoes, basil"
        autoComplete="off"
        aria-label="Ingredients"
      />
      <button
        type="submit"
        className="btn-generate"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? 'Generating...' : 'Generate Recipe'}
      </button>
    </form>
  );

  // Card display for a recipe
  const RecipeCard = ({ recipe }) => (
    <div className={`recipe-card${recipe.accent ? ' highlight' : ''}`}>
      <h3 className="recipe-title">{recipe.title}</h3>
      <div className="recipe-section">
        <strong>Ingredients:</strong>
        <ul>
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>
      <div className="recipe-section">
        <strong>Instructions:</strong>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );

  // Section: list of recipes (cards)
  const RecipeCardsSection = () => (
    <section className="recipes-section">
      {generatedRecipes.length === 0 ? (
        <div className="empty-message">
          <span role="img" aria-label="chef">👩‍🍳</span>
          <br />
          Enter ingredients above and generate a new recipe!
        </div>
      ) : (
        <div className="recipe-cards-list">
          {generatedRecipes.map((rec, i) => (
            <RecipeCard recipe={rec} key={i} />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="App">
      <Branding />
      <main className="main-content">
        <RecipeForm />
        <RecipeCardsSection />
      </main>
    </div>
  );
}

export default App;
