const {poolFn} = require('../config/DBConfig')

// 查找用户
function QueryLoginUser(id) {
  // console.log(id)
  switch(arguments.length){
    case 0:
      return new Promise((resolve, reject) => {
        const data = poolFn(`SELECT * FROM login_user`)
        if (data != '') {
          // console.log(arguments[0], '-------------------------')
          resolve(data)
        } else {
          reject()
        }
      })
    case 1:
      return new Promise((resolve, reject) => {
        const data = poolFn(`SELECT * FROM login_user where id=${id}`)
        if (data != '') {
          resolve(data)
        } else {
          reject()
        }
      })
  }
  
}

function UpdateLoginUser(id,name,phone,permissions){
  return new Promise((resolve,reject)=>{
    const data = poolFn(`UPDATE login_user SET name='${name}', phone='${phone}', permissions='${permissions}' WHERE id = ${id}`)
    if(data!=''){
      resolve(data)
    }else{
      reject()
    }
  })
  
}

function insertLoginUser(obj){
  return new Promise((resolve,reject)=>{
    const data = poolFn(`INSERT INTO login_user(name,phone,permissions) VALUES('${obj.name}','${obj.phone}','${obj.permissions}')`)
    if (data) {
      resolve(data)
    } else {
      reject()
    }
  })
}


module.exports = {
  UpdateLoginUser,
  QueryLoginUser
}