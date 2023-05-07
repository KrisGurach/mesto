import { nameInput, professionInput} from '../utils/constants.js';

export default class UserInfo {
  constructor({ name, profession }) {
    this._name = name;
    this._profession = profession;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._profession.textContent
    };
  }

  setUserInfo() {
    const info = this.getUserInfo();
    nameInput.value = info.name;
    professionInput.value = info.job;
  }
}


