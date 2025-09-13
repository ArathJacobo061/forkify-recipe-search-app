import { API_URL, RESULTS_PER_PAGE, KEY } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: { query: '', results: [], page: 1, resultsPerPage: RESULTS_PER_PAGE },
  bookmarks: [],
};

const normalize = r => ({
  id: r.id,
  title: r.title,
  publisher: r.publisher,
  sourceUrl: r.source_url,
  image: r.image_url,
  servings: r.servings,
  cookTime: r.cooking_time,
  ingredients: r.ingredients,
  bookmarked: false,
});

// ---------- RECETA ----------
export const loadRecipe = async id => {
  const data = await getJSON(`${API_URL}/${id}`);
  state.recipe = normalize(data.data.recipe);
  state.recipe.bookmarked = state.bookmarks.some(b => b.id === id);
};

// ---------- SEARCH ----------
export const loadSearchResults = async query => {
  state.search.query = query;
  const data = await getJSON(`${API_URL}?search=${encodeURIComponent(query)}`);
  state.search.results = data.data.recipes.map(r => ({
    id: r.id,
    title: r.title,
    publisher: r.publisher,
    image: r.image_url,
  }));
  state.search.page = 1;
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

// ---------- SERVINGS ----------
export const updateServings = newServings => {
  const old = state.recipe.servings;
  if (newServings < 1) return;

  state.recipe.ingredients = state.recipe.ingredients.map(ing => {
    if (ing.quantity == null) return ing;
    const q = ing.quantity * (newServings / old);
    return { ...ing, quantity: Math.round(q * 1000) / 1000 }; // 3 decimales internos
  });

  state.recipe.servings = newServings;
};

// ---------- BOOKMARKS ----------
const persistBookmarks = () =>
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));

export const addBookmark = recipe => {
  if (state.bookmarks.some(b => b.id === recipe.id)) return;
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const removeBookmark = id => {
  const i = state.bookmarks.findIndex(b => b.id === id);
  if (i === -1) return;
  state.bookmarks.splice(i, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

// cargar bookmarks al iniciar
(function init() {
  const data = localStorage.getItem('bookmarks');
  if (data) state.bookmarks = JSON.parse(data);
})();

// ---------- ADD RECIPE ----------
export const uploadRecipe = async newRecipe => {
  // 1) Parsear ingredientes
  const ingredients = Object.entries(newRecipe)
    .filter(([k, v]) => k.startsWith('ingredient') && v)
    .map(([, val]) => {
      const parts = val.split(',').map(s => s.trim());
      if (parts.length !== 3)
        throw new Error('Wrong ingredient format! Use "Quantity,Unit,Description"');
      const [quantity, unit, description] = parts;
      return { quantity: quantity ? +quantity : null, unit, description };
    });

  // 2) Crear payload
  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients,
  };

  // 3) Enviar a API
  const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);

  // 4) Guardar en estado y auto-bookmark
  state.recipe = normalize(data.data.recipe);
  addBookmark(state.recipe);
};

