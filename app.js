const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const userContacts = require('./routes/userContacts')
const loginUsers = require('./routes/loginUsers')
const uploads = require('./routes/uploads')
const JWT = require('./util/JWT')
// const io =require('socket.io')();
// io.on('connection', client => { 
//   console.log('连接成功')
//  });
// io.listen(3000);

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))


// 设置允许跨域
app.use(async (ctx, next) => {
  ctx.set("Content-Type", "application/json;charset=utf-8")
  // 允许跨域
  ctx.set("access-control-allow-origin", "*")
  // 允许通过的方法
  ctx.set("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
  // 允许客户端看到的请求头内容
  ctx.set("Access-Control-Expose-Headers", "Authorization")
  // 允许客户端返回的请求头内容
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
app.use(userContacts.routes(), userContacts.allowedMethods())
app.use(loginUsers.routes(), loginUsers.allowedMethods())
app.use(uploads.routes(), uploads.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

//连接socket
app.use(async(ctx,next)=>{
})
module.exports = app
