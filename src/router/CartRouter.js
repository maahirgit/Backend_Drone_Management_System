const router = require('express').Router()
const cartController = require("../controller/CartController")

router.post("/addtocart",cartController.createCart)
router.get("/getcart/:id",cartController.getCart)

module.exports = router