const router = require('express').Router()
const cartController = require("../controller/CartController")

router.post("/addtocart",cartController.createCart)



module.exports = router