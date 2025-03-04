const jwt = require("jsonwebtoken")
const secret = "drone"

const verifyToken = async(req,resizeBy,next) => {
    var token = req.headers.authorisation
    if(token){
        if(token.startsWith("Bearer ")){
            token = token.split(" ")[1]
            console.log(token)
            try{
                const data = jwt.verify(token,secret)
                console.log(data)
                if(data){
                    next()
                }
                else{
                    res.status(401).json({
                        message : "Unauthorised 1"
                    })
                }
            }catch(e){
                res.status(404).json({
                    message : "Unauthorised 2"
                })
            }
        }
        else{
            res.status(403).josn({
                message : "Unauthorised 3"
            })
        }       
    }else{
        res.status(401).json({
            message : "Unauthorised 4"
        })
    }
}

module.exports = {
    verifyToken
}