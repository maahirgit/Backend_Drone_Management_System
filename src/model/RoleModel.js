const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
    Role : {
        type : String
    },
    Description : {
        type : String
    }
})

module.exports = mongoose.model('Role',roleSchema)