const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vendorSchema = new Schema({
    User_id : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    Business_name : {
        type : String
    },
    Business_address : {
        type : String
    },
    Gst_number : {
        type : String
    },
    file : {
        type : String
    },
    Verification_status : {
        type : Boolean
    },
},{
    timestamps : true
})

module.exports = mongoose.model("Vendor",vendorSchema)