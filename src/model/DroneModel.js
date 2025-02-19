const mongoose = require('mongoose')
const Schema = mongoose.Schema

const droneSchema = new Schema({
    Drone_name : {
        type : String
    },
    Drone_brand : {
        type : String
    },
    Drone_description : {
        type : String
    },
    Price_per_hour : {
        type : String
    },
    Price_per_day : {
        type : String
    },
    Availability : {
        type : Boolean
    },
    Images : {
        type : String
    },
})

module.exports = mongoose.model("Drone_details",droneSchema)