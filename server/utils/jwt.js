const jwt = require('jsonwebtoken');
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
    verify:(token)=>{
        try {
            return jwt.verify(token,secretOrPrivateKey)
        } catch (error) {
            return false;
        }
    }
}
module.exports = newJwt