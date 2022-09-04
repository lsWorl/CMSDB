const { UpdateLoginUser, QueryLoginUser, InsertLoginUser, DeleteLoginUser, QueryLoginUserPwd } = require('../dao/LoginUserDao')
const JWT = require('../util/JWT')

const loginUserAdd = async (ctx, next) => {
  try {
    const obj = ctx.query
    if (obj.id && obj.phone && obj.name && obj.permissions) {
      const data = await InsertLoginUser(obj)

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

const loginUserQuery = async (ctx, next) => {
  try {
    const data = await QueryLoginUser()
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
      data: data[0]
    }
  } catch (error) {
    ctx.body = {
      sqlState: error.sqlState,
      sqlMessage: "查询数据有误！"
    }
  }

}

const loginUserUpdate = async (ctx, next) => {
  try {
    const data = await UpdateLoginUser(ctx.query.id, ctx.query.name, ctx.query.phone, ctx.query.permissions)

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

const loginUserDelete = async (ctx, next) => {
  try {
    const { id } = ctx.query
    const data = await DeleteLoginUser(id)
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

const loginController = async (ctx, next) => {
  try {
    // console.log(ctx.query)
    const { name, password, permissions } = ctx.query
    const data = await QueryLoginUserPwd(name, password, permissions)
    
    if (data[0][0]) {
      //设置header
      const token = JWT.generate({
        _id: data[0][0].id,
        name: data[0][0].id
      }, '10000s')
      ctx.set("Authorization", token)
    }
    console.log(data[0], '----------------')


    if (data[0].length === 0 || !data) {
      ctx.body = {
        err: 2,
        code: 406,
        msg: '账号密码错误或权限不一致',
        data: null
      }
      return
    }
    
    // 删除密码后返回给前端信息
    delete data[0][0].password
    ctx.body = {
      ok: 1,
      code: 1,
      msg: '登录成功！',
      data:data[0][0]
    }

  } catch (error) {
    if (error.sqlState) {
      ctx.body = {
        sqlState: error.sqlState,
        sqlMessage: "传入的数据有误！"
      }
    } else {
      ctx.body = {
        error: error
      }
    }

  }
}

module.exports = {
  loginUserAdd,
  loginUserQuery,
  loginUserUpdate,
  loginUserDelete,
  loginController
}