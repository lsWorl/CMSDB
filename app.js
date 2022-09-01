const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const loginUsers = require('./routes/loginUsers')
const JWT = require('./util/JWT')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

// 设置允许跨域
app.use(async (ctx, next) => {
  ctx.set("Content-Type", "application/json;charset=utf-8")
  ctx.set("access-control-allow-origin", "*")
  ctx.set("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
  ctx.set("Access-Control-Expose-Headers", "Authorization")
  ctx.set("Access-Control-Allow-Headers", "Authorization")
  ctx.status = 200
  console.log('已经成功配置跨域！')

  await next()
})
//token验证
app.use(async (ctx, next) => {
  
  if(ctx.url.includes('login')){
    await next()
    return
  }

  const token = ctx.headers["authorization"]?.split(" ")[1]
  console.log(token)
  if(token){
    // 对token解密
    const payload = JWT.verify(token)
    if(payload){
      await next()
    }else{
      ctx.status = 403
      ctx.body = {errCode:-1,errInfo:"token过期"}
    }
  }else{
    await next()
  }
})



app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(loginUsers.routes(), loginUsers.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports = app
