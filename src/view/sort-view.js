import AbstractView from '../framework/view/abstract-view.js';
import { DisabledSortTypes } from '../const.js';
import { SortType } from '../const.js';

function createSortItemTemplate(type, isChecked) {
  return `
            <div class="trip-sort__item  trip-sort__item--${type}">
              <input id="sort-${type}" class="trip-sort__input  visually-hidden event" data-type="${type}" type="radio" name="trip-sort" value="sort-${type}" ${isChecked ? 'checked' : ''} ${DisabledSortTypes.includes(type) ? 'disabled' : ''}>
              <label class="trip-sort__btn" for="sort-${type}">${type}</label>
            </div>`;
}

function createSortTemplate() {
  const sortItemsTemplate = Object.values(SortType).map((type, index) => createSortItemTemplate(type, index === 0)).join('');

  return (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`);
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ handleSortTypeChange }) {
    super();
    this.#handleSortTypeChange = handleSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.classList.contains('event')) {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.type);
  };
}
