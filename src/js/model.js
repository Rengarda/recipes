import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

// state.js для хранения данных рецепта
export const state = {
  recipe: {},
};

// model.js загрузка данных рецепта
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    //обработка временных ошибок
    console.error(`${err} 🚫`);
  }
};
