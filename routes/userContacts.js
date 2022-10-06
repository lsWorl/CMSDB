const router = require('koa-router')()

const {userContactsQuery} = require('../controllers/UserContactsController')
router.prefix('/userContacts')

router.get('/', userContactsQuery)


module.exports = router