const router = require('koa-router')()
const multer = require('@koa/multer');
const {Imageupload} = require('../controllers/FileUploadController')

// 配置上传的文件目录及文件名
const storage = multer.diskStorage({
  destination: function(req, file, cb){
      cb(null, './public/images')
  },
  filename: function(req, file, cb){
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})
const upload = multer({ // 源码中multer是一个函数，所以需要执行
  storage: storage
})
router.prefix('/upload')
router.post('/image',upload.single('files'),Imageupload)

module.exports = router