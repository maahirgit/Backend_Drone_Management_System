const router = require('express').Router()
const droneController = require("../controller/DroneController")

router.post("/addDroneDetails",droneController.addDrone)

module.exports = router