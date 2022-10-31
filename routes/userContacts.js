const router = require('koa-router')()

const {userContactsQuery ,userContactsAdd , confirmContact} = require('../controllers/UserContactsController')
router.prefix('/userContacts')

router.get('/', userContactsQuery)
router.post('/',userContactsAdd)
router.post('/confirm',confirmContact)

module.exports = router