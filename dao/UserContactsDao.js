const { poolFn } = require('../config/DBConfig')
// 生成id用
const short = require('short-uuid');
// 通过ID进行查找
function QueryUserContactId(id) {
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

function InsertUserContact(userId, contactsId,room_key = '', isConfirm = false) {
  return new Promise((resolve, reject) => {
    try {
      const uuid = short.generate()
      // is_out 1表示双向同意 0表示单向申请
      const data = poolFn(`INSERT INTO user_contacts
        (user_id,contact_id,msg_num,last_msg,room_key,is_out) 
        VALUES(${userId},${contactsId},0,"",'${room_key===''? uuid : room_key}',${isConfirm ? 1 : 0})`)
      if (data) {
        resolve(data)
      } else {
        reject({
          code: 406,
          error: "Not Acceptable",
          errMsg: "插入数据不正确"
        })
      }
    } catch (error) {
      console.log('-----------------数据库错误-------------------')
      console.log(error)
    }
  })
}

function confirmUserContact(userId, contactsId) {
  return new Promise(async (resolve, reject) => {
    try {
      // 先进行搜索先前有发送的消息 id反着来
      const searchContactInfo = await poolFn(`SELECT room_key FROM user_contacts 
      WHERE user_id = '${contactsId}' and contact_id='${userId}'`)
      // 获取房间号
      const room_key = searchContactInfo[0][0].room_key
      // 再对状态进行改变
      const state = await changeState(contactsId,userId)
      const result = await InsertUserContact(userId,contactsId,room_key,true)
      if(result&&state){
        resolve(result)
      }
    } catch (error) {
      console.log('-----------------数据库错误-------------------')
      console.log(error)
    }
  })
}

function changeState(userId, contactId) {
  return poolFn(`UPDATE user_contacts set is_out = '1' where user_id='${userId}' and contact_id = '${contactId}'`)
}

module.exports = {
  QueryUserContactId,
  InsertUserContact,
  confirmUserContact
}