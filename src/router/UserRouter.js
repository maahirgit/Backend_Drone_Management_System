const router = require('express').Router()
const userController = require("../controller/UserController")
const tokenMiddleWare = require("../middleware/validateUser")

router.post("/createUser",userController.createUser)
router.post("/loginUser",userController.loginUser)
router.get("/getUser",tokenMiddleWare.verifyToken,userController.getUser)
module.exports = router