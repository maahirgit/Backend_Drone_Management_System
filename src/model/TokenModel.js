const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenSchema = new Schema({
    token : {
        type : String
    },
    userId : {
        type : String
    }
})

module.exports = mongoose.model('Token',tokenSchema)