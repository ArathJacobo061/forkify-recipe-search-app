// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  function $parcel$resolve(url) {  url = importMap[url] || url;  return import.meta.resolve(distDir + url);}newRequire.resolve = $parcel$resolve;

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"iG6lw":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _modelJs = require("./model.js");
var _recipeViewJs = require("./views/recipeView.js");
var _recipeViewJsDefault = parcelHelpers.interopDefault(_recipeViewJs);
var _resultsViewJs = require("./views/resultsView.js");
var _resultsViewJsDefault = parcelHelpers.interopDefault(_resultsViewJs);
var _paginationViewJs = require("./views/paginationView.js");
var _paginationViewJsDefault = parcelHelpers.interopDefault(_paginationViewJs);
var _bookmarksViewJs = require("./views/bookmarksView.js");
var _bookmarksViewJsDefault = parcelHelpers.interopDefault(_bookmarksViewJs);
var _configJs = require("./config.js");
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
        (0, _recipeViewJsDefault.default).renderSpinner();
        await _modelJs.loadRecipe(id);
        (0, _recipeViewJsDefault.default).render(_modelJs.state.recipe);
        if (_modelJs.state.search.results.length) {
            (0, _resultsViewJsDefault.default).render(_modelJs.getSearchResultsPage(_modelJs.state.search.page));
            (0, _paginationViewJsDefault.default).render(_modelJs.state.search);
        }
        (0, _bookmarksViewJsDefault.default).render(_modelJs.state.bookmarks);
    } catch (err) {
        (0, _recipeViewJsDefault.default).renderError(err.message || 'Error loading recipe');
    }
}
async function controlSearch(e) {
    e?.preventDefault?.();
    const q = document.querySelector('.search__field').value.trim();
    if (!q) return;
    (0, _resultsViewJsDefault.default).renderSpinner();
    try {
        await _modelJs.loadSearchResults(q);
        (0, _resultsViewJsDefault.default).render(_modelJs.getSearchResultsPage(1));
        (0, _paginationViewJsDefault.default).render(_modelJs.state.search);
    } catch  {
        (0, _resultsViewJsDefault.default).renderError('Search failed');
    }
}
function controlPagination(goToPage) {
    (0, _resultsViewJsDefault.default).render(_modelJs.getSearchResultsPage(goToPage));
    (0, _paginationViewJsDefault.default).render(_modelJs.state.search);
}
function controlServings(newServings) {
    _modelJs.updateServings(newServings);
    (0, _recipeViewJsDefault.default).render(_modelJs.state.recipe);
}
function controlBookmark() {
    const r = _modelJs.state.recipe;
    if (!r.id) return;
    r.bookmarked ? _modelJs.removeBookmark(r.id) : _modelJs.addBookmark(r);
    (0, _recipeViewJsDefault.default).render(_modelJs.state.recipe);
    (0, _bookmarksViewJsDefault.default).render(_modelJs.state.bookmarks);
}
// ---------- ADD RECIPE ----------
async function controlAddRecipe(e) {
    e.preventDefault();
    const dataArr = [
        ...new FormData(addRecipeForm)
    ];
    const data = Object.fromEntries(dataArr);
    try {
        await _modelJs.uploadRecipe(data);
        (0, _recipeViewJsDefault.default).render(_modelJs.state.recipe);
        (0, _bookmarksViewJsDefault.default).render(_modelJs.state.bookmarks);
        // actualizar URL sin recargar
        window.history.pushState(null, '', `#${_modelJs.state.recipe.id}`);
        // cerrar modal
        setTimeout(()=>{
            addRecipeWindow.classList.add('hidden');
            overlay.classList.add('hidden');
            addRecipeForm.reset();
        }, (0, _configJs.MODAL_CLOSE_SEC) * 1000);
    } catch (err) {
        alert(err.message);
    }
}
// ---------- INIT ----------
function init() {
    (0, _recipeViewJsDefault.default).addHandlerRender(showRecipe);
    (0, _recipeViewJsDefault.default).addHandlerUpdateServings(controlServings);
    (0, _recipeViewJsDefault.default).addHandlerAddBookmark(controlBookmark);
    searchForm.addEventListener('submit', controlSearch);
    (0, _paginationViewJsDefault.default).addHandlerClick(controlPagination);
    (0, _bookmarksViewJsDefault.default).addHandlerRender(()=>(0, _bookmarksViewJsDefault.default).render(_modelJs.state.bookmarks));
    // modal Add Recipe
    btnOpen.addEventListener('click', ()=>{
        addRecipeWindow.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });
    btnClose.addEventListener('click', ()=>{
        addRecipeWindow.classList.add('hidden');
        overlay.classList.add('hidden');
    });
    overlay.addEventListener('click', ()=>{
        addRecipeWindow.classList.add('hidden');
        overlay.classList.add('hidden');
    });
    addRecipeForm.addEventListener('submit', controlAddRecipe);
}
init();

},{"./model.js":"apAHS","./views/recipeView.js":"jPwAc","./views/resultsView.js":"erXDa","./views/paginationView.js":"UjmxJ","./views/bookmarksView.js":"3aPUm","./config.js":"3zjFZ","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"apAHS":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>state);
parcelHelpers.export(exports, "loadRecipe", ()=>loadRecipe);
parcelHelpers.export(exports, "loadSearchResults", ()=>loadSearchResults);
parcelHelpers.export(exports, "getSearchResultsPage", ()=>getSearchResultsPage);
parcelHelpers.export(exports, "updateServings", ()=>updateServings);
parcelHelpers.export(exports, "addBookmark", ()=>addBookmark);
parcelHelpers.export(exports, "removeBookmark", ()=>removeBookmark);
parcelHelpers.export(exports, "uploadRecipe", ()=>uploadRecipe);
var _configJs = require("./config.js");
var _helpersJs = require("./helpers.js");
const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: (0, _configJs.RESULTS_PER_PAGE)
    },
    bookmarks: []
};
const normalize = (r)=>({
        id: r.id,
        title: r.title,
        publisher: r.publisher,
        sourceUrl: r.source_url,
        image: r.image_url,
        servings: r.servings,
        cookTime: r.cooking_time,
        ingredients: r.ingredients,
        bookmarked: false
    });
const loadRecipe = async (id)=>{
    const data = await (0, _helpersJs.getJSON)(`${(0, _configJs.API_URL)}/${id}`);
    state.recipe = normalize(data.data.recipe);
    state.recipe.bookmarked = state.bookmarks.some((b)=>b.id === id);
};
const loadSearchResults = async (query)=>{
    state.search.query = query;
    const data = await (0, _helpersJs.getJSON)(`${(0, _configJs.API_URL)}?search=${encodeURIComponent(query)}`);
    state.search.results = data.data.recipes.map((r)=>({
            id: r.id,
            title: r.title,
            publisher: r.publisher,
            image: r.image_url
        }));
    state.search.page = 1;
};
const getSearchResultsPage = (page = state.search.page)=>{
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
};
const updateServings = (newServings)=>{
    const old = state.recipe.servings;
    if (newServings < 1) return;
    state.recipe.ingredients = state.recipe.ingredients.map((ing)=>{
        if (ing.quantity == null) return ing;
        const q = ing.quantity * (newServings / old);
        return {
            ...ing,
            quantity: Math.round(q * 1000) / 1000
        }; // 3 decimales internos
    });
    state.recipe.servings = newServings;
};
// ---------- BOOKMARKS ----------
const persistBookmarks = ()=>localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
const addBookmark = (recipe)=>{
    if (state.bookmarks.some((b)=>b.id === recipe.id)) return;
    state.bookmarks.push(recipe);
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmarks();
};
const removeBookmark = (id)=>{
    const i = state.bookmarks.findIndex((b)=>b.id === id);
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
const uploadRecipe = async (newRecipe)=>{
    // 1) Parsear ingredientes
    const ingredients = Object.entries(newRecipe).filter(([k, v])=>k.startsWith('ingredient') && v).map(([, val])=>{
        const parts = val.split(',').map((s)=>s.trim());
        if (parts.length !== 3) throw new Error('Wrong ingredient format! Use "Quantity,Unit,Description"');
        const [quantity, unit, description] = parts;
        return {
            quantity: quantity ? +quantity : null,
            unit,
            description
        };
    });
    // 2) Crear payload
    const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients
    };
    // 3) Enviar a API
    const data = await (0, _helpersJs.sendJSON)(`${(0, _configJs.API_URL)}?key=${(0, _configJs.KEY)}`, recipe);
    // 4) Guardar en estado y auto-bookmark
    state.recipe = normalize(data.data.recipe);
    addBookmark(state.recipe);
};

},{"./config.js":"3zjFZ","./helpers.js":"1U8Qc","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3zjFZ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "API_URL", ()=>API_URL);
parcelHelpers.export(exports, "TIMEOUT_SEC", ()=>TIMEOUT_SEC);
parcelHelpers.export(exports, "RESULTS_PER_PAGE", ()=>RESULTS_PER_PAGE);
parcelHelpers.export(exports, "KEY", ()=>KEY);
parcelHelpers.export(exports, "MODAL_CLOSE_SEC", ()=>MODAL_CLOSE_SEC);
const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
const TIMEOUT_SEC = 10;
const RESULTS_PER_PAGE = 10;
const KEY = 'REEMPLAZA_CON_TU_KEY';
const MODAL_CLOSE_SEC = 2.5;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"1U8Qc":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getJSON", ()=>getJSON);
parcelHelpers.export(exports, "sendJSON", ()=>sendJSON);
var _configJs = require("./config.js");
const timeout = (s)=>new Promise((_, reject)=>setTimeout(()=>reject(new Error(`Request took too long! \u{23F3} (${s}s)`)), s * 1000));
const getJSON = async (url)=>{
    const res = await Promise.race([
        fetch(url),
        timeout((0, _configJs.TIMEOUT_SEC))
    ]);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
};
const sendJSON = async (url, uploadData)=>{
    const fetchPro = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uploadData)
    });
    const res = await Promise.race([
        fetchPro,
        timeout((0, _configJs.TIMEOUT_SEC))
    ]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message ?? 'Upload failed'} (${res.status})`);
    return data;
};

},{"./config.js":"3zjFZ","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jPwAc":[function(require,module,exports,__globalThis) {
// js/views/recipeView.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
class RecipeView extends (0, _viewJsDefault.default) {
    _parentElement = document.querySelector('.recipe');
    _errorMessage = 'We could not find that recipe. Please try another one!';
    addHandlerRender(handler) {
        [
            'hashchange',
            'load'
        ].forEach((ev)=>window.addEventListener(ev, handler));
    }
    addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener('click', (e)=>{
            const btn = e.target.closest('.btn--increase-servings');
            if (!btn) return;
            const updateTo = +btn.dataset.updateTo;
            if (updateTo > 0) handler(updateTo);
        });
    }
    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener('click', (e)=>{
            const btn = e.target.closest('.btn--bookmark');
            if (!btn) return;
            handler();
        });
    }
    _generateMarkup() {
        return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title"><span>${this._data.title}</span></h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon"><use href="${0, _iconsSvgDefault.default}#icon-clock"></use></svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon"><use href="${0, _iconsSvgDefault.default}#icon-users"></use></svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings - 1}">
              <svg><use href="${0, _iconsSvgDefault.default}#icon-minus-circle"></use></svg>
            </button>
            <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings + 1}">
              <svg><use href="${0, _iconsSvgDefault.default}#icon-plus-circle"></use></svg>
            </button>
          </div>
        </div>

        <button class="btn--round btn--bookmark">
          <svg><use href="${0, _iconsSvgDefault.default}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use></svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${this._data.sourceUrl}" target="_blank">
          <span>Directions</span>
          <svg class="search__icon"><use href="${0, _iconsSvgDefault.default}#icon-arrow-right"></use></svg>
        </a>
      </div>
    `;
    }
    _generateMarkupIngredient(ing) {
        return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon"><use href="${0, _iconsSvgDefault.default}#icon-check"></use></svg>
        <div class="recipe__quantity">${ing.quantity ?? ''}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit ?? ''}</span>
          ${ing.description}
        </div>
      </li>`;
    }
}
exports.default = new RecipeView();

},{"./view.js":"lI2wF","url:../../img/icons.svg":"fCFh2","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"lI2wF":[function(require,module,exports,__globalThis) {
// js/views/view.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
class View {
    _data;
    _message = '';
    render(data) {
        if (!data || Array.isArray(data) && data.length === 0) {
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
        newEls.forEach((newEl, i)=>{
            const curEl = curEls[i];
            // texto
            if (!newEl.isEqualNode(curEl) && newEl.firstChild && newEl.firstChild.nodeValue.trim() !== '') curEl.textContent = newEl.textContent;
            // atributos
            if (!newEl.isEqualNode(curEl)) Array.from(newEl.attributes).forEach((attr)=>curEl.setAttribute(attr.name, attr.value));
        });
    }
    _clear() {
        this._parentElement.innerHTML = '';
    }
    renderSpinner() {
        const markup = `
      <div class="spinner">
        <svg><use href="${(0, _iconsSvgDefault.default)}#icon-loader"></use></svg>
      </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderError(message = this._errorMessage || "Something went wrong \uD83D\uDE22") {
        const markup = `
      <div class="error">
        <div>
          <svg><use href="${(0, _iconsSvgDefault.default)}#icon-alert-triangle"></use></svg>
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
          <svg><use href="${(0, _iconsSvgDefault.default)}#icon-smile"></use></svg>
        </div>
        <p>${message}</p>
      </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}
exports.default = View;

},{"url:../../img/icons.svg":"fCFh2","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fCFh2":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("icons.5cf4c4cc.svg");

},{}],"erXDa":[function(require,module,exports,__globalThis) {
// js/views/resultsView.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
class ResultsView extends (0, _viewJsDefault.default) {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query. Please try again!';
    _message = '';
    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join('');
    }
    _generateMarkupPreview(rec) {
        return `
      <li class="preview">
        <a class="preview__link" href="#${rec.id}">
          <figure class="preview__fig">
            <img src="${rec.image}" alt="${rec.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher ?? ''}</p>
            <div class="preview__user-generated ${rec.key ? '' : 'hidden'}">
              <svg><use href="${0, _iconsSvgDefault.default}#icon-user"></use></svg>
            </div>
          </div>
        </a>
      </li>`;
    }
}
exports.default = new ResultsView();

},{"./view.js":"lI2wF","url:../../img/icons.svg":"fCFh2","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"UjmxJ":[function(require,module,exports,__globalThis) {
// js/views/paginationView.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
class PaginationView extends (0, _viewJsDefault.default) {
    _parentElement = document.querySelector('.pagination');
    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', (e)=>{
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }
    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        if (curPage === 1 && numPages > 1) return this._generateButton(curPage + 1, 'next');
        if (curPage === numPages && numPages > 1) return this._generateButton(curPage - 1, 'prev');
        if (curPage < numPages) return `
        ${this._generateButton(curPage - 1, 'prev')}
        ${this._generateButton(curPage + 1, 'next')}
      `;
        return '';
    }
    _generateButton(page, type) {
        return `
      <button data-goto="${page}" class="btn--inline pagination__btn--${type}">
        ${type === 'prev' ? `<svg class="search__icon"><use href="${0, _iconsSvgDefault.default}#icon-arrow-left"></use></svg>` : ''}
        <span>Page ${page}</span>
        ${type === 'next' ? `<svg class="search__icon"><use href="${0, _iconsSvgDefault.default}#icon-arrow-right"></use></svg>` : ''}
      </button>`;
    }
}
exports.default = new PaginationView();

},{"./view.js":"lI2wF","url:../../img/icons.svg":"fCFh2","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3aPUm":[function(require,module,exports,__globalThis) {
// js/views/bookmarksView.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class BookmarksView extends (0, _viewJsDefault.default) {
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
exports.default = new BookmarksView();

},{"./view.js":"lI2wF","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["iG6lw"], "iG6lw", "parcelRequire1d09", {}, "./", "/")

//# sourceMappingURL=proyecto.1a0308d9.js.map
