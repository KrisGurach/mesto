export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderAll(items) {
    items.reverse().forEach(data => this._renderer(data));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
