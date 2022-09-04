const router = require('koa-router')()
const {loginUserAdd ,loginUserQuery ,loginUserUpdate , loginUserDelete , loginController} = require('../controllers/LoginUserController')

router.prefix('/loginUsers')

router.get('/', loginUserQuery)
  .post('/', loginUserUpdate)
  .put('/', loginUserAdd)
  .delete('/', loginUserDelete)

router.post('/login', loginController)

module.exports = router