class User {
  #id
  #name
  #phone
  #createDate
  #address
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

  setCreateDate(createDate) {
    this.#createDate = createDate
  }

  getCreateDate() {
    return this.#createDate
  }

  setAddress(address) {
    this.#address = address
  }

  getAddress() {
    return this.#address
  }

}

module.exports =  User 