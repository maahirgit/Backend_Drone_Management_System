const router = require('express').Router();
const orderController = require("../controller/OrderController");

router.post("/createOrder", orderController.createOrder);
router.get("/getOrder", orderController.getOrder);

module.exports = router;