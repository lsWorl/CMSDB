const { poolFn } = require('../config/DBConfig')

// 查找用户
function QueryUser(offset = 0 , limit = 10) {
  // console.log(id)
  return new Promise((resolve, reject) => {
    const data = poolFn(`SELECT * FROM user LIMIT ${offset} , ${limit}`)
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
function QueryUserId(id) {
  return new Promise((resolve, reject) => {
    const data = poolFn(`SELECT * FROM user where id=${id}`)
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
// 通过手机号查找
function QueryUserPhone(phone){
  return new Promise((resolve, reject) => {
    const data = poolFn(`SELECT * FROM user where phone=${phone}`)
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
function UpdateUser(id, name, phone, date, address) {
  return new Promise((resolve, reject) => {
    const data = poolFn(`UPDATE user SET name='${name}', phone='${phone}', date='${date}', address='${address}' WHERE id = ${id}`)
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

// 新增用户
function InsertUser(obj) {
  return new Promise((resolve, reject) => {
    // 判断是否有传入id
    let data
    
  
    if(obj.id){
      data = poolFn(`INSERT INTO user(id,name,phone,date,address) VALUES(${obj.id},'${obj.name}','${obj.phone}','${obj.date}','${obj.address}')`)
    }else{
      data = poolFn(`INSERT INTO user(name,phone,date,address,password) VALUES('${obj.name}','${obj.phone}','${obj.date}','${obj.address}','${obj.password}')`)
    }
    
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
function DeleteUser(id) {
  return new Promise((resolve,reject)=>{
    const data = poolFn(`DELETE FROM user WHERE id = ${id}`)
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

// 验证用户登录
const UserLoginIsValid = (phone,password)=>{
  return new Promise((resolve,reject)=>{
    const data = poolFn(`SELECT * FROM user where phone=${phone} AND password='${password}'`)
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

// 修改用户头像
const ModifyAvatar = (path)=>{
  console.log('Dao');
  console.log(path)
}


module.exports = {
  UpdateUser,
  QueryUser,
  InsertUser,
  DeleteUser,
  UserLoginIsValid,
  QueryUserId,
  QueryUserPhone,
  ModifyAvatar
}