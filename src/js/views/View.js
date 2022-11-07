import icons from 'url:../../img/icons.svg';

export default class View {

  data;
  /**
   * Render the recieved object to the DOM
   * @param {Object / Object[]} data The data to be rendered (e.g recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering it to the DOM 
   * @returns {undefined/string} A Markup string is returned if render is false
   * @this {Object} View instance
   * @todo Finish the implementation 
   */

  render(data, render = true) {
    this.data = data;
    if (!data || (Array.isArray(data)) && data.length === 0) return this.renderError();

    const markup = this.generateMarkup();
    if (!render) return markup;
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);

  }

  update(data) {


    this.data = data;

    const newMarkup = this.generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this.parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {

        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))

      }
    }
    )

  }

  renderError(message = this.errorMessage) {

    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);

  }

  clear() {
    this.parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
      </div> `;
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup)
  }

  renderMessage(message = this.message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

}

