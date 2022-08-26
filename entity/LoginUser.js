class LoginUser {
  #id
  #name
  #phone
  #permissions
  constructor() {}

  setId(id) {
    this.#id = id
  }

  getId() {
    return this.#id
  }

  setName(name) {
    this.#name = name
  }

  getName() {
    return this.#name
  }

  setPhone(phone) {
    this.#phone = phone
  }

  getPhone() {
    return this.#phone
  }

  setPermissions(permissions) {
    this.#permissions = permissions
  }

  getPermissions() {
    return this.#permissions
  }

}

module.exports =  LoginUser 