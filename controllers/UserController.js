const { QueryUser, UpdateUser, InsertUser, DeleteUser, UserLoginIsValid } = require('../dao/UserDao')

// 获取随机数
const getRandomValues = require('get-random-values')

// 存放验证码
let BackValidCode
// 存放已经登录的用户
const LoginedUserId = []
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
    // console.log(ctx.query)
    const { phone, password, validCode } = ctx.query

    // 验证验证码
    if (validCode === BackValidCode) {
      const data = await UserLoginIsValid(phone, password)
      // console.log(data[0][0])
      // 去除密码把消息传给前端
      const newData = { ...data[0][0] }
      delete newData.password

      if (data[0].length === 0 || !data) {
        ctx.body = {
          err: 2,
          ok: 3,
          code: 406,
          msg: '登录验证失败',
          data: null
        }
        return
      }

      // 判断用户是否已经登录
      let isLogin = false
      if (LoginedUserId.length != 0) {
        // 不等于-1说明已经登录
        if (LoginedUserId.indexOf(newData.id) != -1) {
          isLogin = true
        } else {
          LoginedUserId.push(newData.id)
        }
      } else {
        LoginedUserId.push(newData.id)
      }

      // 已经登录返回消息告诉前端
      if (isLogin) return ctx.body = {
        ok: 4,
        code: 1,
        msg: '用户已经登录了！',
        data: newData
      }

      ctx.body = {
        ok: 1,
        code: 1,
        msg: '登录验证成功！',
        data: newData
      }
    } else {
      ctx.body = {
        ok: 2,
        code: 402,
        msg: '验证码错误！'
      }
    }
  } catch (error) {
    ctx.body = {
      sqlState: error,
      sqlMessage: "SQL数据有误！"
    }
  }
}

// 用户注册
const userRegistry = async (ctx, next) => {
  try {
    console.log(ctx.query)
    const { validCode, phone, password } = ctx.query
    if (validCode === BackValidCode) {
      // 模拟假数据
      const address = '学源街'
      const name = 'user'
      const nowDate = new Date()
      const date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDay()
      const obj = {
        phone,
        password,
        name,
        address,
        date
      }
      const data = await InsertUser(obj)
      if (data[0].length === 0 || !data) {
        ctx.body = {
          err: 2,
          code: 406,
          msg: '注册信息错误',
          data: null
        }
        return
      }

      ctx.body = {
        ok: 1,
        code: 1,
        msg: '注册成功！'
      }
    } else {
      ctx.body = {
        ok: 2,
        code: 402,
        msg: '验证码错误'
      }
    }

  } catch (error) {
    console.log(typeof error.sqlState)
    if (error.sqlState === '23000') {
      ctx.body = {
        ok: 3,
        sqlState: error.sqlState,
        sqlMessage: "手机号已存在！"
      }
      return
    }
    ctx.body = {
      sqlState: error.sqlState,
      sqlMessage: "SQL数据有误！"
    }
  }
}

// 模拟验证码发送
const sendValidCode = async (ctx, next) => {
  try {
    let array = new Uint8Array(2);
    // 获取随机数
    getRandomValues(array);
    console.log(array);
    // 小于三位数加100转变为三位数
    if (array[0] < 100) { array[0] = array[0] + 100 }
    if (array[1] < 100) { array[1] = array[1] + 100 }
    BackValidCode = array[0] + '' + array[1]
    ctx.body = {
      ok: 1,
      code: 1,
      data: {
        validCode: array[0] + '' + array[1]
      }
    }
  } catch (error) {
    console.log(error)
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
  sendValidCode,
  userRegistry
}