const {QueryUserId} = require('../dao/UserContactsDao')


// 通过用户登录id来查询多少好友
const userContactsQuery = async (ctx, next)=>{
  try {

    // userId是登录用户的id
    const {userId} = ctx.query
    console.log('-------------传入数据--------------')
    const data = await QueryUserId(userId)
    if(!data[0]) return ctx.body = {
      code: 406,
      error: "Not Acceptable",
      errMsg: "传入的id错误"
    }

    ctx.body = {
      ok: 1,
      code: 1,
      data: data[0],
      total: data[0].length
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


module.exports = {
  userContactsQuery
}