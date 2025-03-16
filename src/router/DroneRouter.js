const router = require('express').Router()
const droneController = require("../controller/DroneController")

router.post("/addDroneDetails",droneController.addDrone)
router.get("/getDroneDetails",droneController.getDrone)

module.exports = router