const { ModifyAvatar } = require('../dao/UserDao')
const os = require('os')

const Imageupload = (ctx, next) => {
  try {
    const osType = os.type(); //系统类型
    const netInfo = os.networkInterfaces(); //网络信息
    console.log(osType)
    if (ctx.file) {
      if (osType == 'Windows_NT') {
        console.log(netInfo)
        // 获取ip地址
        for (const dev in netInfo) {
          
        }
      }
      const subPath = ctx.file.destination.substring(8)
      const avatarPath = 'http://127.0.0.1:3001' + subPath + '/' + ctx.file.filename
      // console.log(avatarPath)
      ModifyAvatar(avatarPath)
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