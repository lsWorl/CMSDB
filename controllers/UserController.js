const { QueryUser, UpdateUser, InsertUser, DeleteUser , UserLoginIsValid } = require('../dao/UserDao')

// 添加用户
const userAdd = async (ctx, next) => {

  try {
    const obj = ctx.query
    if (obj.id && obj.date && obj.phone && obj.name && obj.address) {
      const data = await InsertUser(obj)

      if (data[0].length === 0 || !data) {
        ctx.body = {
          err: 2,
          code: 406,
          msg: '添加错误',
          data: null
        }
        return
      }

      ctx.body = {
        ok: 1,
        code: 1,
        msg: '添加成功！'
      }
    } else {
      ctx.body = {
        code: 406,
        error: "Not Acceptable",
        errMsg: "发送的数据不符合格式"
      }
    }


  } catch (error) {
    ctx.body = {
      sqlState: error.sqlState,
      sqlMessage: "放入的数据有误！"
    }
  }

}

// 查询用户
const userQuery = async (ctx, next) => {
  try {
    const data = await QueryUser(ctx.query?.offset, ctx.query?.limit)
    if (data[0].length === 0 || !data) {
      ctx.body = {
        err: 2,
        code: 406,
        msg: '查询错误',
        data: null
      }
      return
    }

    data[0].forEach((item) => {
      // 删除密码，不将密码传给前端
      delete item.password
    })

    ctx.body = {
      ok: 1,
      code: 1,
      data: data[0],
      total: data[0].length
    }
  } catch (error) {
    ctx.body = {
      sqlState: error.sqlState,
      sqlMessage: "查询数据有误！"
    }
  }

}

// 更新用户
const userUpdate = async (ctx, next) => {
  try {
    const data = await UpdateUser(ctx.query.id, ctx.query.name, ctx.query.phone, ctx.query.date, ctx.query.address)
    if (data[0].length === 0 || !data) {
      ctx.body = {
        err: 2,
        code: 406,
        msg: '更新错误',
        data: null
      }
      return
    }

    ctx.body = {
      ok: 1,
      code: 1,
      msg: '更新成功！'
    }
  } catch (error) {
    ctx.body = {
      sqlState: error.sqlState,
      sqlMessage: "放入的数据有误！"
    }
  }

}

// 删除用户
const userDelete = async (ctx, next) => {
  try {
    const { id } = ctx.query
    const data = await DeleteUser(id)
    if (data[0].length === 0 || !data) {
      ctx.body = {
        err: 2,
        code: 406,
        msg: '删除错误',
        data: null
      }
      return
    }

    ctx.body = {
      ok: 1,
      code: 1,
      msg: '删除成功！'
    }

  } catch (error) {
    ctx.body = {
      sqlState: error.sqlState,
      sqlMessage: "删除的数据有误！"
    }
  }

}

// 用户登录
const userLogin = async (ctx, next) => {
  try {
    console.log(ctx.query)
    const { phone, password, validCode } = ctx.query
    
    // 验证验证码
    if (validCode === '1') {
      const data = await UserLoginIsValid(phone,password)

      if (data[0].length === 0 || !data) {
        ctx.body = {
          err: 2,
          code: 406,
          msg: '删除错误',
          data: null
        }
        return
      }

      ctx.body = {
        ok: 1,
        code: 1,
        msg: '登录验证成功！'
      }
    }
  } catch (error) {
    ctx.body = {
      sqlState: error,
      sqlMessage: "SQL数据有误！"
    }
  }
}

// 模拟验证码发送
const sendValidCode = async(ctx, next)=>{
  try {
    const ValidCode = Math.floor(Math.random() * 1000000) 
  } catch (error) {
    ctx.body = {
      sqlState: error,
      sqlMessage: "服务器出问题"
    }
  }
}
module.exports = {
  userAdd,
  userQuery,
  userUpdate,
  userDelete,
  userLogin,
  sendValidCode
}