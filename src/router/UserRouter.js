const router = require('express').Router()
const userController = require("../controller/UserController")
const tokenMiddleWare = require("../middleware/validateUser")
const zodMiddleware = require("../middleware/ZodMiddleware")
const LoginValidationSchema = require('../util/LoginValidation')
const SignupValidationSchema = require('../util/SignupValidation')

router.post("/createUser",userController.createUser)
router.post("/loginUser",userController.loginUser)
router.get("/getUser",tokenMiddleWare.verifyToken,userController.getUser)
router.post("/logoutUser", userController.logoutUser);
router.post("/forgotPassword",userController.forgotPassword)
router.post("/resetPassword",userController.resetPassword)
module.exports = router