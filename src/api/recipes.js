import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllRecipes = async () => {
  const response = await axios.get(`${API_URL}/recipes/search`);
  return response.data;
};

export const getRecipesByFilter = async (type, value) => {
  const response = await axios.get(
    `${API_URL}/recipes/filter?type=${type}&value=${value}`
  );
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/recipes/${id}`);
  return response.data;
};
