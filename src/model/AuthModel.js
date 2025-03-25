const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OtpSchema = new Schema({
    
    Otp :{
        type : Number
    },
    Email : {
        type : String
    },
    Time : {
        type : Date
    }
})

module.exports = mongoose.model('Auth',OtpSchema);