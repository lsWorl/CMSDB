const { poolFn } = require('../config/DBConfig')

// 查找用户
function QueryLoginUser() {
  return new Promise((resolve, reject) => {
    const data = poolFn(`SELECT * FROM login_user`)
    if (data != '') {
      resolve(data)
    } else {
      reject({
        code: 406,
        error: "Not Acceptable",
        errMsg: "查询的数据不符合格式"
      })
    }
  })
}
// 通过ID进行查找
function QueryLoginUserId(id) {
  return new Promise((resolve, reject) => {
    const data = poolFn(`SELECT * FROM login_user where id=${id}`)
    if (data != '') {
      resolve(data)
    } else {
      reject({
        code: 406,
        error: "Not Acceptable",
        errMsg: "查询的数据不符合格式"
      })
    }
  })
}

// 通过账号密码查询用户
function QueryLoginUserPwd(name,pwd,permissions){
  return new Promise((resolve,reject)=>{
    const data = poolFn(`SELECT * FROM login_user where name='${name}' and password = '${pwd}' and permissions = ${permissions}`)
    if (data != '') {
      resolve(data)
    } else {
      reject({
        code: 406,
        error: "Not Acceptable",
        errMsg: "查询的数据不符合格式"
      })
    }
  })
}

// 更新用户
function UpdateLoginUser(id, name, phone, permissions) {
  return new Promise((resolve, reject) => {
    const data = poolFn(`UPDATE login_user SET name='${name}', phone='${phone}', permissions='${permissions}' WHERE id = ${id}`)
    if (data != '') {
      resolve(data)
    } else {
      reject({
        code: 406,
        error: "Not Acceptable",
        errMsg: "发送的数据不符合格式"
      })
    }
  })

}

// 新增用户
function InsertLoginUser(obj) {
  return new Promise((resolve, reject) => {
    const data = poolFn(`INSERT INTO login_user(id,name,phone,permissions) VALUES(${obj.id},'${obj.name}','${obj.phone}','${obj.permissions}')`)
    if (data) {
      resolve(data)
    } else {
      reject({
        code: 406,
        error: "Not Acceptable",
        errMsg: "发送的数据不符合格式"
      })
    }
  })
}

// 删除用户
function DeleteLoginUser(id) {
  return new Promise((resolve,reject)=>{
    const data = poolFn(`DELETE FROM login_user WHERE id = ${id}`)
    if(data){
      resolve(data)
    } else {
      reject({
        code: 406,
        error: "Not Acceptable",
        errMsg: "发送的数据不符合格式"
      })
    }
  })
}

module.exports = {
  UpdateLoginUser,
  QueryLoginUser,
  InsertLoginUser,
  DeleteLoginUser,
  QueryLoginUserPwd
}