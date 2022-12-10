const os = require('os')
let ip
const getIp = ()=>{
  const osType = os.type(); //系统类型
  const netInfo = os.networkInterfaces(); //网络信息
  if (osType == 'Windows_NT') {
    // 获取ip地址
    for (const val of netInfo.以太网) {
      // console.log(val)
      if(val.family == 'IPv4'){
        ip = val.address
        return ip
      }
    }
  }
}
module.exports = {
  ip,
  getIp
}