const router = require('express').Router()
const vendorController = require("../controller/VendorController")
const uploadController = require("../controller/UploadController")

router.post("/addVendor",vendorController.addVendor)

module.exports = router