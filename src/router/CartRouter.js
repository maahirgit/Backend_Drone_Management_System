const router = require('express').Router()
const cartController = require("../controller/CartController")

router.post("/addtocart",cartController.createCart)
// router.get("/User_id", cartController.getCartByUser)



module.exports = router