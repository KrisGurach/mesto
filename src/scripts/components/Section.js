export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderAll() {
    this._items.forEach((data) => this._renderer(data))
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
