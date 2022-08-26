const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const {poolFn} = require('./config/DBConfig')

const LoginUser = require('./dao/LoginUserDao')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// 创建与数据库的连接池
// app.use(async (ctx,next)=>{
//   const data = await poolFn('SELECT * FROM user')
//   console.log(data[0])
//   await next()
// })

// 设置允许跨域
app.use( async(ctx,next)=>{
  ctx.res.writeHead(200,{
    "Content-Type": "application/json;charset=utf-8",
    "access-control-allow-origin": "*",
    "Access-Control-Allow-Methods":"DELETE,PUT,POST,GET,OPTIONS"
  })
  console.log('已经成功配置跨域！')
  await next()
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

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports = app
