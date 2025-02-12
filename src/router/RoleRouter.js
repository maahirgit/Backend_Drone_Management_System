const router = require('express').Router()
const roleController = require("../controller/RoleController")

router.post("/createRole",roleController.createRole)
router.get("/getRole",roleController.getRole)
module.exports = router