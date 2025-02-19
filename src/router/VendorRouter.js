const router = require('express').Router()
const vendorController = require("../controller/VendorController")
const uploadController = require("../controller/UploadController")

router.post("/addVendor",vendorController.addVendor)
router.post("/addFile",uploadController.uploadFile)


module.exports = router