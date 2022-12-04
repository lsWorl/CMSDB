const router = require('koa-router')()
const {Imageupload} = require('../controllers/FileUploadController')
router.prefix('/upload')
router.post('/image',Imageupload)

module.exports = router