import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipeById, getRecipesByFilter } from "../api/recipes";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [categoryRecipes, setCategoryRecipes] = useState([]);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const data = await getRecipeById(id);
      setRecipe(data);
      if (data.strCategory) {
        const categoryData = await getRecipesByFilter("c", data.strCategory);
        setCategoryRecipes(categoryData);
      }
    } catch (error) {
      console.error("Error loading recipe:", error);
    }
  };

  if (!recipe) return <p>Loading...</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 3, padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            style={{ width: "200px", borderRadius: "8px" }}
          />

          <h1 style={{ textAlign: "center" }}>{recipe.strMeal}</h1>
        </div>
        <h3 style={{ textAlign: "center" }}>
          <Link
            to={`/?type=a&value=${recipe.strArea}`}
            style={{ textDecoration: "none", color: "#007BFF" }}
          >
            {recipe.strArea}
          </Link>
        </h3>

        <p style={{ textAlign: "center" }}>{recipe.strInstructions}</p>

        <h3 style={{ textAlign: "center" }}>Ingredients:</h3>
        <ul style={{ textAlign: "center", listStyle: "none" }}>
          {ingredients.map((item, index) => {
            const [ingredient] = item.split(" - ");
            return (
              <li key={index}>
                <Link to={`/?type=i&value=${ingredient}`}>{item}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div style={{ flex: 1, padding: "20px", borderLeft: "1px solid #ddd" }}>
        <h3>Рецепты из категории "{recipe.strCategory}"</h3>
        <ul>
          {categoryRecipes.map((meal) => (
            <li key={meal.idMeal}>
              <Link to={`/recipe/${meal.idMeal}`}>{meal.strMeal}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recipe;
