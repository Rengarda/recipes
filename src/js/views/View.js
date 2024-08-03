import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data; // Приватное поле для хранения данных о рецепте

  /**
   * Отображает полученный объект в DOM
   * @param {Object | Object[]} data Данные для отображения (например, рецепт)
   * @param {boolean} [render=true] Если false, создать строку разметки вместо отображения в DOM
   * @returns {undefined | string} Возвращается строка разметки, если render=false
   * @this {Object} Экземпляр View
   * @author Daria
   * @todo Завершить реализацию
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data; // Сохраняем данные в приватное поле
    const markup = this._generateMarkup(); // Генерируем разметку и вставляем на страницу

    if (!render) return markup;

    this._clear(); // Очищаем родительский элемент перед вставкой разметки
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Обновляет содержимое элемента на основе новых данных.
   * Метод сравнивает текущую разметку с новой и обновляет только те части, которые изменились.
   * @param {Object} data - Новые данные, которые используются для генерации обновленной разметки.
   * @this {Object} View - Экземпляр класса View, на который вызывается метод.
   * @property {Element} _parentElement - Родительский элемент, в котором происходит обновление разметки.
   * @method _generateMarkup - Метод класса View, генерирующий разметку на основе текущих данных.
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Преобразуем HTML-строку в реальные DOM-элементы
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // Сравнение элементов по индексам
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // обновление измененного текста
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // обновление изменнненого атрибутов
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
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

  renderError(message = this._errorMessage) {
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
  renderMessage(message = this._message) {
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
