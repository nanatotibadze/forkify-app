
import View from "./View.js";


class SearchView extends View {
    parentElement = document.querySelector(".search");
    errorMessage = "No recipes found. Try again!"
    message = "";

    getQuery() {
        const query = this.parentElement.querySelector(".search__field").value;
        this.clearInput();
        return query;
    }
    clearInput() {
        this.parentElement.querySelector(".search__field").value = "";
    }
    addHandlerSearch(handler) {
        this.parentElement.addEventListener("submit", function (e) {
            e.preventDefault();
            handler();
        })
    }

};

export default new SearchView();