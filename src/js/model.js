import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

// state.js для хранения данных рецепта
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

// model.js загрузка данных рецепта
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

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
    throw err;
  }
};

// Загрузка результатов поиска рецептов по заданному запросу
export const loadSearchResults = async function (query) {
  try {
    // Сохраняем запрос в состоянии
    state.search.query = query;

    const data = await getJSON(` ${API_URL}?search=${query}`);
    console.log(data.data);

    // Обрабатываем полученные результаты поиска и сохраняем их в состоянии приложения (state.search.results)
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} 🚫`);
    throw err;
  }
};
