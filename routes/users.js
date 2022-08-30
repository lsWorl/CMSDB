const router = require('koa-router')()
const { QueryUser, UpdateUser, InsertUser , DeleteUser} = require('../dao/UserDao')
router.prefix('/users')

router.get('/', async (ctx, next) => {
  try {
    const data = await QueryUser()
    if (data[0].length === 0 || !data) {
      ctx.body = {
        err: 2,
        code: 406,
        msg: '查询错误',
        data: null
      }
      return
    }
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

})
  .post('/', async (ctx, next) => {
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

  })
  .put('/', async (ctx, next) => {

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

  })
  .delete('/', async (ctx, next) => {
    try {
      const {id} = ctx.query
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
    
  })

router.get('/search', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
