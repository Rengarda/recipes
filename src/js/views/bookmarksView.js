import { addBookmark } from '../model.js';
import View from './View.js';
import previeewView from './previeewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage =
    'Закладок пока нет. Найдите хороший рецепт и добавьте его в закладки:)';
  _message = '';

  addHandlerRender(hendler) {
    window.addEventListener('load', hendler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previeewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();
