import View from "./View.js";

import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
    parentElement = document.querySelector(".upload");
    message = "Recipe was successfully uploaded";
    window = document.querySelector(".add-recipe-window");
    overlay = document.querySelector(".overlay");
    btnOpen = document.querySelector(".nav__btn--add-recipe");
    btnClose = document.querySelector(".btn--close-modal");


    toggleWindow() {
        this.overlay.classList.toggle("hidden");
        this.window.classList.toggle("hidden");
    }


    addHandlerShowWindow() {
        this.btnOpen.addEventListener("click", this.toggleWindow.bind(this));
    }

    addHandlerCloseWindow() {
        this.btnClose.addEventListener("click", this.toggleWindow.bind(this));
        this.overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    constructor() {
        super();
        this.addHandlerShowWindow();
        this.addHandlerCloseWindow();
    }

    addHandlerUpload(handler) {
        this.parentElement.addEventListener("submit", function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }

    generateMarkup() {

    }
}

export default new AddRecipeView();

