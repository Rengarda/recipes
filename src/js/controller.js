import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Контроллер для загрузки и отображения рецептов
const controlRecipes = async function () {
  try {
    // Извлекаем идентификатор рецепта из хэша URL
    const id = window.location.hash.slice(1);

    if (!id) return;

    //0)Обновление вида результатов для пометки выбранного результата поиска
    resultsView.update(model.getSearchResultsPage());

    //1) Загрузка данных рецепта
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2) Отображение данных рецепта с помощью метода render объекта recipeView
    recipeView.render(model.state.recipe);
    //3) Обновление закладок
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

// Контроллер для загрузки и отображения результатов поиска
const controlSearcResults = async function () {
  try {
    resultsView.renderSpinner();

    //1) Получаем поисковый запрос от пользователя
    const query = searchView.getQuery();
    if (!query) return;

    //2) Загрузка данных о рецептах по запросу
    await model.loadSearchResults(query);

    //3)Результаты поиска
    resultsView.render(model.getSearchResultsPage(1));

    //4) Отображение начальных кнопок нумерации страниц
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Загружаем новую страницу результатов
  resultsView.render(model.getSearchResultsPage(goToPage));

  //обновление отображения
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //обновление сервиса рецепта(в состоянии)
  model.updateServings(newServings);
  //обновление вида рецепта
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1) Добавление/удаление закладок
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deletBookmark(model.state.recipe.id);

  //2) Обновление вида рецепта
  recipeView.update(model.state.recipe);

  //3) Render закладок
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearcResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();
