const router = require('koa-router')()

const { userAdd, userQuery, userUpdate, userDelete } = require('../controllers/UserController')
router.prefix('/users')

router.get('/', userQuery)
  .post('/', userUpdate)
  .put('/', userAdd)
  .delete('/', userDelete)

router.get('/search', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
