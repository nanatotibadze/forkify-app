
import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";

import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/pagination.js";
import bookmarkView from "./views/bookmarkView.js";
import addRecipeView from "./views/addRecipeView.js";

// if (module.hot) {
//   module.hot.accept();
// };


// https://forkify-api.herokuapp.com/v2


const showRecipe = async function () {
  try {

    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());


    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    bookmarkView.update(model.state.bookmarks);
  }
  catch (err) {
    recipeView.renderError();
  }
};


const controlSearchResults = async function () {
  try {

    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);

  }
  catch (err) {
    throw (err);

  }
};


const controlPagination = function (goToPage) {

  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);

};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);


};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);

};

const controlBookmark = function () {
  model.state.bookmarks.forEach(el => {
    if (el.bookmarked) bookmarkView.render();
  });

};
const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks)
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    bookmarkView.render(model.state.bookmarks);
    window.history.pushState(null, "title", `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);



  }
  catch (err) {
    addRecipeView.renderError(err.message);
  }

  location.reload();

};
const newFeature = function () {
  console.log("welcome")
}


const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerBookmark(controlAddBookmark);
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();

};

init();
