const model = require('mongoose')
const jwt = require('jsonwebtoken')
const secret = "drone";

const verifyToken = (req,res,next) => {
    var token = req.headers.authorisation
    console.log(token)
    if(token){
        if(token.startsWith("Bearer ")){
            token = token.split(" ")[1]
            console.log(token)
            try{
                console.log("Hello",secret)
                const user = jwt.verify(token,secret)
                console.log(user,"Hi")
                if(user){
                    next()
                }
                else{
                    res.status(403).json({
                        message:"Unauthorised"
                    })
                }
            }catch(e){
                res.status(405).json({
                    message:"Unauthorised"
                })
            }
        }else{
            res.status(400).json({
                message : "Unauthorised"
            })
        }
    }else{
        console.log("Hello")
        res.status(404).json({
            message:"Unauthorised"
        })
    }
}


const validateuser = async(req,res,next) => {
    var token = req.headers.token
    console.log(token)
    if(token == "123456"){
        console.log("user authorised")
        next()
    }
    else{
        res.status(401).json({
            message:"unauthorised"
        })
    }
}

module.exports = {
    validateuser,
    verifyToken
}