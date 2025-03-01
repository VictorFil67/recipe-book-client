import { useState, useEffect } from "react";
import { getAllRecipes, getRecipesByFilter } from "../api/recipes";
import { Link, useSearchParams } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");
    const value = searchParams.get("value");

    if (type && value) {
      fetchFilteredRecipes(type, value);
    } else {
      fetchAllRecipes();
    }
  }, [searchParams]);

  const fetchAllRecipes = async () => {
    try {
      const data = await getAllRecipes();
      setRecipes(data);
    } catch (error) {
      console.error("Error while receiving data:", error);
    }
  };

  const fetchFilteredRecipes = async (type, value) => {
    try {
      const data = await getRecipesByFilter(type, value);
      setRecipes(data);
    } catch (error) {
      console.error("Error loading recipe:", error);
    }
  };

  return (
    <div>
      <h1>List of Recipes</h1>
      <ul>
        {recipes.map((meal) => (
          <li key={meal.idMeal}>
            <Link to={`/recipe/${meal.idMeal}`}>{meal.strMeal}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
