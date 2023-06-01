export default class UserInfo {
  constructor({ name, profession, avatar }) {
    this._name = name;
    this._profession = profession;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._profession.textContent,
      avatar: this._avatar
    };
  }

  setUserInfo(inputValues) {
     this._name.textContent = inputValues.name;
     this._profession.textContent = inputValues.profession;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }

  setWebUserInfo(info) {
    this._name.textContent = info.name;
    this._profession.textContent = info.about;
    this._avatar.src = info.avatar;
  }
}


