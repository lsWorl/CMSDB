const router = require('koa-router')()

const { userAdd, userQuery, userUpdate, userDelete ,userLogin , sendValidCode} = require('../controllers/UserController')
router.prefix('/users')

router.get('/', userQuery)
  .post('/', userUpdate)
  .put('/', userAdd)
  .delete('/', userDelete)

router.get('/search', function (ctx, next) {
  ctx.body = {msg:'this is a users/bar response'}
})

router.post('/login',userLogin)

router.post('/validCode',sendValidCode)

module.exports = router
