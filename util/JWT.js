const jwt = require('jsonwebtoken')
// 密钥
const secret = 'secret'

const JWT = {
  // 签名
  generate(value,expires){
    return jwt.sign(value,secret,{expiresIn:expires})
  },
  // 验证
  verify(token){
    try {
      return jwt.verify(token,secret)
    } catch (error) {
      return false
    }
  }
}

module.exports = JWT