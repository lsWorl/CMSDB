const router = require('koa-router')()
const { QueryUser, UpdateUser , InsertUser } = require('../dao/UserDao')
router.prefix('/users')

router.get('/', async (ctx, next) => {
  const data = await QueryUser()
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
  .post('/', async (ctx, next) => {
    const data = await UpdateUser(ctx.query.id, ctx.query.name, ctx.query.phone, ctx.query.date, ctx.query.address)

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
  .put('/',async (ctx,next)=>{
    const obj = ctx.query
    console.log(obj)
  })

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
