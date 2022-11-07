
import View from "./View.js";

import icons from 'url:../../img/icons.svg';
import previewView from "./previewView.js";

class ResultsView extends View {
  parentElement = document.querySelector(".results");
  errorMessage = "No recipes found. Try again!"
  message = " ";

  generateMarkup() {
    return this.data.map(bookmark => previewView.render(bookmark, false)).join("");
  }

}

export default new ResultsView();




