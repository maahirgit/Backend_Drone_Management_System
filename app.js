const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())

const RoleRoutes = require("./src/router/RoleRouter")
app.use("/role",RoleRoutes)

const UserRoutes = require("./src/router/UserRouter")
app.use("/user",UserRoutes)

const VendorRoutes = require("./src/router/VendorRouter")
app.use("/vendor",VendorRoutes)

const DroneRoutes = require("./src/router/DroneRouter")
app.use("/drone",DroneRoutes)

const CartRoutes = require("./src/router/CartRouter")
app.use("/cart",CartRoutes)

const db = mongoose.connect("mongodb://127.0.0.1:27017/Drone_Management_System")
db.then((data) => {
    console.log("DB Connected")
}).catch((err) => {
    console.log(err)
})

const PORT = 3001
app.listen(PORT,() => {
    console.log("Server is connected to port 3001")
})