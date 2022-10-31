const { QueryUserContactId, InsertUserContact, confirmUserContact } = require('../dao/UserContactsDao')
const { QueryUserId } = require('../dao/UserDao')

// 通过用户登录id来查询多少好友
const userContactsQuery = async (ctx, next) => {
  try {

    // userId是登录用户的id
    const { userId } = ctx.query
    console.log('-------------传入数据--------------')
    const data = await QueryUserContactId(userId)
    // console.log(data[0])
    // 最终返回的数据
    const finalData = [];
    // 通过获取联系人来获取用户信息
    for (let i = 0; i < data[0].length; i++) {
      const result = await QueryUserId(data[0][i].contact_id)
      // console.log(result[0][0]);
      delete result[0][0].password
      finalData.push({
        ...result[0][0],
        last_msg: data[0][i].last_msg,
        room_key: data[0][i].room_key,
        last_msg: data[0][i].last_msg
      })

    }
    console.log(finalData)
    if (!data[0]) return ctx.body = {
      code: 406,
      error: "Not Acceptable",
      errMsg: "传入的id错误"
    }

    ctx.body = {
      ok: 1,
      code: 200,
      data: finalData,
      total: finalData.length
    }


  } catch (error) {
    console.log('-----------------查询联系人报错-------------------')
    console.log(error)
    ctx.body = {
      code: 500,
      error: "Data error",
      errMsg: "数据库出错"
    }
  }
}

// 添加好友 传入用户id和要加好友的id
const userContactsAdd = async (ctx, next) => {
  try {
    const { userId, contactId } = ctx.request.body
    const data = await InsertUserContact(userId, contactId)
    console.log(data)
    if (data) {
      ctx.body = {
        ok: 1,
        code: 200,
        msg: "已经成功发送消息！"
      }

    }
  } catch (error) {
    ctx.body = {
      code: 500,
      error: "Data error",
      errMsg: "数据库出错"
    }
  }
}
// 确认添加
const confirmContact = async (ctx,next)=>{
  try {
    const { userId, contactId } = ctx.request.body
    const data = await confirmUserContact(userId, contactId)
    if(data){
      ctx.body = {
        ok: 1,
        code: 200,
        msg: "成功确认添加用户信息！"
      }
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      error: "Data error",
      errMsg: "数据库出错"
    }
  }
}


module.exports = {
  userContactsQuery,
  userContactsAdd,
  confirmContact
}