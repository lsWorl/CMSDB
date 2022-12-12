const router = require('koa-router')()

const {userContactsQuery ,userContactsAdd , confirmContact , deleteContact} = require('../controllers/UserContactsController')
router.prefix('/userContacts')

router.get('/', userContactsQuery)
router.post('/',userContactsAdd)
router.post('/confirm',confirmContact)
router.delete('/',deleteContact)

module.exports = router