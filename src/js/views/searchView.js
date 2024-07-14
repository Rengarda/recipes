class SearchView {
  #parentElement = document.querySelector('.search');

  // Извлекаем значение из поля ввода
  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearInput(query);
    return query;
  }

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
