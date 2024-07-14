import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Контроллер для загрузки и отображения рецептов
const controlRecipes = async function () {
  try {
    // Извлекаем идентификатор рецепта из хэша URL
    const id = window.location.hash.slice(1);

    if (!id) return;

    //1) Загрузка данных рецепта
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2) Отображение данных рецепта с помощью метода render объекта recipeView
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

// Контроллер для загрузки и отображения результатов поиска
const controlSearcResults = async function () {
  try {
    //1) Получаем поисковый запрос от пользователя
    const query = searchView.getQuery();
    if (!query) return;

    //2) Загрузка данных о рецептах по запросу
    await model.loadSearchResults(query);

    //3)Результаты поиска
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearcResults);
};
init();
