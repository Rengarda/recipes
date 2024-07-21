import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data; // Приватное поле для хранения данных о рецепте

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(this._errorMessage);

    this._data = data; // Сохраняем данные в приватное поле
    const markup = this._generateMarkup(); // Генерируем разметку и вставляем на страницу
    this._clear(); // Очищаем родительский элемент перед вставкой разметки
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._message) {
    const markup = `
      <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Метод для отображения общего сообщения
  renderMessage(message = this._errorMessage) {
    const markup = `
      <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
