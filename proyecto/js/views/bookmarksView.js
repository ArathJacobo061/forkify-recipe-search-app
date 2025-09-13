// js/views/bookmarksView.js
import View from './view.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(b) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${b.id}">
          <figure class="preview__fig">
            <img src="${b.image}" alt="${b.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${b.title}</h4>
            <p class="preview__publisher">${b.publisher ?? ''}</p>
          </div>
        </a>
      </li>`;
  }
}

export default new BookmarksView();
