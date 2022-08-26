const router = require('koa-router')()
const { UpdateLoginUser , QueryLoginUser } = require('../dao/LoginUserDao')
router.prefix('/users')

router.get('/', async (ctx, next) => {
  const data = await QueryLoginUser()
  if (data[0].length === 0 || !data) {
    ctx.body = {
      err: 2,
      code: 200,
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
})
  .put('/', async (ctx, next) => {
    const data = await UpdateLoginUser(ctx.query.id, ctx.query.name, ctx.query.phone, ctx.query.permissions)

    if (data[0].length === 0 || !data) {
      ctx.body = {
        err: 2,
        code: 200,
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

    // console.log(ctx.query, '123456----------------')
  })

module.exports = router