const jwt = require('jsonwebtoken');
// 加密token的秘钥，任意值
const secretOrPrivateKey = 'nas8y9n32s'
const newJwt={
    /**
     * 
     * @param {*} value 要加密的值
     * @param {*} time 过期时间
     */
    creat:(value,time='10s')=>{
        return jwt.sign(value,secretOrPrivateKey,{expiresIn:time})
    },
    /**
     * 
     * @param {*} token 要解密的token
     * @returns 返回解析后的值，里面包括创建的时候传的value，和过期时间。如果出错了或过期返回false
     */
    verify:(token)=>{
        try {
            return jwt.verify(token,secretOrPrivateKey)
        } catch (error) {
            return false;
        }
    }
}
module.exports = newJwt