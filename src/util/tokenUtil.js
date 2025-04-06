const jwt = require('jsonwebtoken')
const secret = "drone"

const generateToken = (payload) => {
    const token = jwt.sign(payload,secret,{
        expiresIn:60
    })
    return token
}

return module.exports = {generateToken} 