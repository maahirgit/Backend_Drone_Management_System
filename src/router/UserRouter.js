const router = require('express').Router()
const userController = require("../controller/UserController")

router.post("/createUser",userController.createUser)
router.post("/loginUser",userController.loginUser)
module.exports = router