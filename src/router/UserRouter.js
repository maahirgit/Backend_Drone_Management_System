const router = require('express').Router()
const userController = require("../controller/UserController")

router.post("/createUser",userController.createUser)
module.exports = router