export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderAll() {
    const elements = [];
    this._items.forEach((data) => {
      const element = this._renderer(data);
      elements.push(element);
    });
    return elements;
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
