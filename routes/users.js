const router = require('koa-router')()
const {poolFn} = require('../config/DBConfig')
router.prefix('/users')

router.get('/', async (ctx, next) => {
  // console.log(ctx.query,'----------------')
  const data =  await poolFn(`SELECT * FROM user`)
  // new Date(data[0].date)
  console.log(new Date())
  if(data[0].length===0){
    ctx.body = {
      err:2,
      code:200,
      msg:'查询错误',
      data:null
    }
    return
  }
    ctx.body = {
    ok:1,
    code:1,
    data:data[0]
  }
})
.put('/',async (ctx,next)=>{
  const data =  await poolFn(`UPDATE user SET name='${ctx.query.name}', phone='${ctx.query.phone}', date='${ctx.query.date}', address='${ctx.query.address}' WHERE id = ${ctx.query.id}`)

  if(data[0].length===0){
    ctx.body = {
      err:2,
      code:200,
      msg:'更新错误',
      data:null
    }
    return
  }
    ctx.body = {
    ok:1,
    code:1,
    msg:'更新成功！'
  }

  console.log(ctx.query,'123456----------------')
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
