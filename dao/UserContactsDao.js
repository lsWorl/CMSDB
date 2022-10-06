const { poolFn } = require('../config/DBConfig')

// 通过ID进行查找
function QueryUserId(id) {
  return new Promise((resolve, reject) => {
    try {
      
      const data = poolFn(`SELECT * FROM user_contacts where user_id=${id}`)
      
    if (data != '') {
      resolve(data)
    } else {
      reject({
        code: 406,
        error: "Not Acceptable",
        errMsg: "查询的数据不符合格式"
      })
    }
    } catch (error) {
      console.log('-----------------数据库错误-------------------')
      console.log(error)
    }
  })
}

module.exports = {
  QueryUserId
}