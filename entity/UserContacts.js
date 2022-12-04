class UserContactsEntity {
  // 保存用户发送的介绍信息
  #userIntroduction = new Map()
  constructor() {}

  setUserIntroductionInfo(id,introduction){
    this.#userIntroduction.set(id,introduction)
    console.log(this.#userIntroduction);
  }

  getUserIntroductionInfo(id){
    console.log(id)
    return this.#userIntroduction.get(id)
  }

}

module.exports =  UserContactsEntity 