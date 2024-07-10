import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Извлекаем идентификатор рецепта из хэша URL
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    //1) Загрузка данных рецепта
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2) Отображение данных рецепта с помощью метода render объекта recipeView
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err.message);
  }
};
//обработка событий 'hashchange' (изменение хэша в URL)  и 'load' (загрузка страницы).
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
