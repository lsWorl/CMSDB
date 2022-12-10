const router = require('koa-router')()

const { userAdd, userQuery, userUpdate, userDelete, userLogin, sendValidCode, userRegistry, userQueryId, userQueryPhone , userLogOut } = require('../controllers/UserController')
router.prefix('/users')

router.get('/', userQuery)
  .post('/', userUpdate)
  .put('/', userAdd)
  .delete('/', userDelete)

router.get('/searchId', userQueryId)
router.get('/searchPhone', userQueryPhone)
router.post('/login', userLogin)

router.post('/registry', userRegistry)

router.get('/validCode', sendValidCode)

router.get('/logOut',userLogOut)

module.exports = router
