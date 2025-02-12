const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    Fname : {
        type : String
    },
    Lname : {
        type : String
    },
    Email : {
        type : String
    },
    Password : {
        type : String
    },
    Role_id : {
        type : Schema.Types.ObjectId,
        ref : 'Role'
    }
})

module.exports = mongoose.model("User",userSchema)
