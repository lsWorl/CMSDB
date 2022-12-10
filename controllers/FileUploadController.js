const { ModifyAvatar } = require('../dao/UserDao')
const os = require('os')
const {getIp} = require('../util/state')
const Imageupload = async (ctx, next) => {
  try {
    const {id} = ctx.request.body
    // console.log(ctx.file)
    const osType = os.type(); //系统类型
    const netInfo = os.networkInterfaces(); //网络信息
    // console.log(osType)
    if (ctx.file) {
      const ip = getIp()
      const subPath = ctx.file.destination.substring(8)
      const avatarPath = `http://${ip}:3001` + subPath + '/' + ctx.file.filename
      // console.log(avatarPath)
      const result = await ModifyAvatar(avatarPath,id)
      console.log(result)
      if(result){
        ctx.body = {
          code:200,
          data:{
            avatarPath
          },
          msg:'上传成功！'
        }
      }
    } else {
      ctx.body = {
        code: 500,
        data: "没有上传图片！！"
      }
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      err: "网络繁忙，请稍后再试！"
    }
  }
}

module.exports = {
  Imageupload
}