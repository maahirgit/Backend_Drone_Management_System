const router = require('express').Router()
const userController = require("../controller/UserController")
const tokenMiddleWare = require("../middleware/validateUser")
const zodMiddleware = require("../middleware/ZodMiddleware")
const LoginValidationSchema = require('../util/LoginValidation')
const SignupValidationSchema = require('../util/SignupValidation')

router.post("/createUser",zodMiddleware.validateSchema(SignupValidationSchema),userController.createUser)
router.post("/loginUser",zodMiddleware.validateSchema(LoginValidationSchema),userController.loginUser)
router.get("/getUser",tokenMiddleWare.verifyToken,userController.getUser)
module.exports = router