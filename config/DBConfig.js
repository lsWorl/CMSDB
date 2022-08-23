const state = require('../util/state')
const mysql2 = require('mysql2')
function getDBConfig(){
  return{
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'abc123',
    database:'cms',
  }
}
const config = getDBConfig()
const  pool = mysql2.createPool(config).promise()

// 添加修改语句
function poolFn(sql){
  return new Promise((resolve,reject)=>{
    pool.execute(sql).then(res=>{
      resolve(res)
    }).catch(err=>{
      console.log(err,'--------------------------------')
      reject(err)
    })
  })
}

module.exports = {
  poolFn
}