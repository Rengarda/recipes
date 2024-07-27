import View from './View.js';
import previeewView from './previeewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'По вашему запросу рецепт не найден!';
  _message = '';

  //Генерирует разметку для всех результатов поиска
  _generateMarkup() {
    return this._data.map(result => previeewView.render(result, false)).join();
  }
}
export default new ResultsView();
