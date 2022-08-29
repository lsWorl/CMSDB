const { poolFn } = require('../config/DBConfig')

// 查找用户
function QueryUser(id) {
  // console.log(id)
  switch(arguments.length){
    case 0:
      return new Promise((resolve, reject) => {
        const data = poolFn(`SELECT * FROM user`)
        if (data != '') {
          // console.log(arguments[0], '-------------------------')
          resolve(data)
        } else {
          reject()
        }
      })
    case 1:
      return new Promise((resolve, reject) => {
        const data = poolFn(`SELECT * FROM user where id=${id}`)
        if (data != '') {
          resolve(data)
        } else {
          reject()
        }
      })
  }
  
}


// 更新用户
function UpdateUser(id,name, phone, date, address) {
  return new Promise((resolve, reject) => {
    const data = poolFn(`UPDATE user SET name='${name}', phone='${phone}', date='${date}', address='${address}' WHERE id = ${id}`)
    if (data) {
      resolve(data)
    } else {
      reject()
    }
  })

}

// 新增用户
function InsertUser(obj){
  return new Promise((resolve,reject)=>{
    const data = poolFn(`INSERT INTO user(name,phone,date,address) VALUES('${obj.name}','${obj.phone}','${obj.date}','${obj.address}')`)
    if (data) {
      resolve(data)
    } else {
      reject()
    }
  })
}


module.exports = {
  UpdateUser,
  QueryUser,
  InsertUser
}