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

  setUserInfo(inputValues) {
     this._name.textContent = inputValues.name;
     this._profession.textContent = inputValues.profession;
  }
}


