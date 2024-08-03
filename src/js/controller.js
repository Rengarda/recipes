import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// Контроллер для управления рецептами
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Обновить представление результатов поиска, чтобы отметить выбранный результат
    resultsView.update(model.getSearchResultsPage());

    // 1) Обновление представления закладок
    bookmarksView.update(model.state.bookmarks);

    // 2) Загрузка рецепта
    await model.loadRecipe(id);

    // 3) Отображение рецепта
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

// Контроллер для управления результатами поиска
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Получить поисковый запрос
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Загрузить результаты поиска
    await model.loadSearchResults(query);

    // 3) Отобразить результаты
    resultsView.render(model.getSearchResultsPage());

    // 4) Отобразить начальные кнопки пагинации
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// Контроллер для управления пагинацией
const controlPagination = function (goToPage) {
  // 1) Отобразить НОВЫЕ результаты
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Отобразить НОВЫЕ кнопки пагинации
  paginationView.render(model.state.search);
};

// Контроллер для управления количеством порций
const controlServings = function (newServings) {
  // Обновить количество порций в состоянии
  model.updateServings(newServings);

  // Обновить представление рецепта
  recipeView.update(model.state.recipe);
};

// Контроллер для управления закладками
const controlAddBookmark = function () {
  // 1) Добавить/удалить закладку
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Обновить представление рецепта
  recipeView.update(model.state.recipe);

  // 3) Отобразить закладки
  bookmarksView.render(model.state.bookmarks);
};

// Контроллер для отображения закладок
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// Контроллер для добавления нового рецепта
const controlAddRecipe = async function (newRecipe) {
  try {
    // Показать спиннер загрузки
    addRecipeView.renderSpinner();

    // Загрузить данные нового рецепта
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Отобразить рецепт
    recipeView.render(model.state.recipe);

    // Сообщение об успешном добавлении
    addRecipeView.renderMessage();

    // Отобразить представление закладок
    bookmarksView.render(model.state.bookmarks);

    // Изменить ID в URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Закрыть окно формы
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

// Инициализация обработчиков событий
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
