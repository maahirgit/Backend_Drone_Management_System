const model = require('mongoose')
const jwt = require('jsonwebtoken')
const secret = "drone";


const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    token = token.split(" ")[1];

    try {
        const user = jwt.verify(token, secret);
        req.user = user;
        next();
    } catch (e) {
        res.status(403).json({ message: "Invalid Token" });
    }
};


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