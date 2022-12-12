const os = require('os')
let ip
const getIp = ()=>{
  const osType = os.type(); //系统类型
  const netInfo = os.networkInterfaces(); //网络信息
  if (osType == 'Windows_NT') {
    console.log(netInfo)
    // 获取ip地址
    try {
      for (const val of netInfo.以太网) {
        // console.log(val)
        if(val.family == 'IPv4'){
          ip = val.address
          return ip
        }
      }
    } catch (error) {
      for (const val of netInfo.WLAN) {
        // console.log(val)
        if(val.family == 'IPv4'){
          ip = val.address
          return ip
        }
      }
    }
    
  }
}
module.exports = {
  ip,
  getIp
}