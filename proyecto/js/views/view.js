// js/views/view.js
import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  _message = '';

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.renderError();
      return;
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newEls = Array.from(newDOM.querySelectorAll('*'));
    const curEls = Array.from(this._parentElement.querySelectorAll('*'));

    newEls.forEach((newEl, i) => {
      const curEl = curEls[i];
      // texto
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild &&
        newEl.firstChild.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // atributos
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg><use href="${icons}#icon-loader"></use></svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage || 'Something went wrong 😢') {
    const markup = `
      <div class="error">
        <div>
          <svg><use href="${icons}#icon-alert-triangle"></use></svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message || 'Success!') {
    const markup = `
      <div class="message">
        <div>
          <svg><use href="${icons}#icon-smile"></use></svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
