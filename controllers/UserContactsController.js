const { QueryUserContactId, InsertUserContact, confirmUserContact , removeContact } = require('../dao/UserContactsDao')
const { QueryUserId } = require('../dao/UserDao')
const UserContactsEntity = require('../entity/UserContacts')
// 通过用户登录id来查询多少好友
const userContactsQuery = async (ctx, next) => {
  try {

    // userId是登录用户的id
    const { userId } = ctx.query
    console.log('-------------传入数据--------------')
    const data = await QueryUserContactId(userId)
    // 最终返回的数据
    const finalData = [];
    // 通过获取联系人来获取用户信息
    for (let i = 0; i < data[0].length; i++) {
      const result = await QueryUserId(data[0][i].contact_id)
      // console.log(result[0][0]);
      delete result[0][0].id
      delete result[0][0].password
      finalData.push({
        ...result[0][0],
        ...data[0][i]
      })

    }
    // console.log(finalData)
    if (!data[0]) return ctx.body = {
      code: 406,
      error: "Not Acceptable",
      errMsg: "传入的id错误"
    }
    // console.log('--------传的联系人数据-------');
    // console.log(finalData)
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
    // 获取介绍信息，如果没有则默认添加
    const introduction = ctx.request.body.introduction ? ctx.request.body.introduction : '添加好友';
    const { userId, contactId, roomKey } = ctx.request.body
    const userContactsEntity = new UserContactsEntity();
    const userKey = `${userId}-${contactId}`
    // 如果没有传入房间号说明是添加好友
    if (!roomKey) {
      userContactsEntity.setUserIntroductionInfo(userKey, introduction)
      // userIntroduction.set(userId,introduction);
      console.log('没有房间钥匙')
    }
    console.log('获取用户的介绍信息');
    console.log(userContactsEntity.getUserIntroductionInfo(userKey))
    const data = await InsertUserContact(userId, contactId)
    // console.log(data)
    if (data) {
      ctx.body = {
        ok: 1,
        code: 200,
        msg: "已经成功发送消息！"
      }

    }
  } catch (error) {
    console.log('错误信息');
    console.log(error)
    ctx.body = {
      code: 500,
      error: "Data error",
      errMsg: "数据库出错"
    }
  }
}
// 确认添加
const confirmContact = async (ctx, next) => {
  try {
    const { userId, contactId } = ctx.request.body
    const data = await confirmUserContact(userId, contactId)
    if (data) {
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

// 删除好友
const deleteContact = async (ctx, next) => {
  try {
    const { userId, contactId } = ctx.request.body
    console.log(userId,contactId)
    // 通过用户id和联系人id来进行删除
    const data = await removeContact(userId, contactId)
    console.log(data)
    if(data[0].affectedRows == 1){
      ctx.body = {
        code:200,
        msg:"删除成功！"
      }
    }else{
      ctx.body = {
        code:400,
        msg:"删除失败，请稍后再试！"
      }
    }
    
    // const data = await confirmUserContact(userId, contactId)
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
  confirmContact,
  deleteContact
}
