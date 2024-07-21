import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

// state.js для хранения данных рецепта
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
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

//пагинации результатов поиска
export const getSearchResultsPage = function (page = state.search.page) {
  //Обновляем текущую страницу в состоянии
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;

  return state.search.results.slice(start, end);
};
