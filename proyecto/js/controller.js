import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import { MODAL_CLOSE_SEC } from './config.js';

const searchForm = document.querySelector('.search');

// --------- Selectores del modal ---------
const addRecipeForm = document.querySelector('.upload');
const addRecipeWindow = document.querySelector('.add-recipe-window');
const overlay = document.querySelector('.overlay');
const btnOpen = document.querySelector('.nav__btn--add-recipe');
const btnClose = document.querySelector('.btn--close-modal');

// ---------- CONTROLADORES ----------
async function showRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);

    if (model.state.search.results.length) {
      resultsView.render(model.getSearchResultsPage(model.state.search.page));
      paginationView.render(model.state.search);
    }
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError(err.message || 'Error loading recipe');
  }
}

async function controlSearch(e) {
  e?.preventDefault?.();
  const q = document.querySelector('.search__field').value.trim();
  if (!q) return;
  resultsView.renderSpinner();
  try {
    await model.loadSearchResults(q);
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
  } catch {
    resultsView.renderError('Search failed');
  }
}

function controlPagination(goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
}

function controlBookmark() {
  const r = model.state.recipe;
  if (!r.id) return;
  r.bookmarked ? model.removeBookmark(r.id) : model.addBookmark(r);
  recipeView.render(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
}

// ---------- ADD RECIPE ----------
async function controlAddRecipe(e) {
  e.preventDefault();
  const dataArr = [...new FormData(addRecipeForm)];
  const data = Object.fromEntries(dataArr);

  try {
    await model.uploadRecipe(data);
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);

    // actualizar URL sin recargar
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // cerrar modal
    setTimeout(() => {
      addRecipeWindow.classList.add('hidden');
      overlay.classList.add('hidden');
      addRecipeForm.reset();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    alert(err.message);
  }
}

// ---------- INIT ----------
function init() {
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);

  searchForm.addEventListener('submit', controlSearch);
  paginationView.addHandlerClick(controlPagination);

  bookmarksView.addHandlerRender(() =>
    bookmarksView.render(model.state.bookmarks)
  );

  // modal Add Recipe
  btnOpen.addEventListener('click', () => {
    addRecipeWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
  btnClose.addEventListener('click', () => {
    addRecipeWindow.classList.add('hidden');
    overlay.classList.add('hidden');
  });
  overlay.addEventListener('click', () => {
    addRecipeWindow.classList.add('hidden');
    overlay.classList.add('hidden');
  });

  addRecipeForm.addEventListener('submit', controlAddRecipe);
}

init();

