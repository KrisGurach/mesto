import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(isEdition, callbackHuy, popupSelector) {
    super(popupSelector);
    this._callbackHuy = callbackHuy; //саму фуекцию нужно прописать в index.js или в другом файле, где будет создаваться новый блять экземпляр ебучкласса
    this._isEdition = isEdition;
  }

  _getInputValues() {
    if (this._isEdition) {
      
    }
  }
}


