import View from "./View.js";

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this.parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = + btn.dataset.goto;


      handler(goToPage);

    })
  }

  generatePreviousButton(page) {
    return `<button data-goto = "${page - 1}"class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span> Page ${page - 1}</span>
      </button>
   
      `;

  }

  generateNextButton(page) {
    return `<button data-goto = "${page + 1}" class="btn--inline pagination__btn--next">
        <span> Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`

  }




  generateMarkup() {
    const curPage = this.data.page;
    const numPages = Math.ceil(this.data.results.length / this.data.resultPerPage);


    //page 1 

    if (curPage === 1 && numPages > 1) {
      // return generateNextButton;
      return this.generateNextButton(curPage)

    }

    //page 2

    //page 3
    if (curPage < numPages) {

      // return [generateNextButton, generatePreviousButton];
      return `${this.generatePreviousButton(curPage)}, ${this.generateNextButton(curPage)} `


    }
    if (curPage === numPages && numPages > 1) {
      // return generatePreviousButton;
      return this.generatePreviousButton(curPage);
    }
    return " ";
  }

}


export default new PaginationView();