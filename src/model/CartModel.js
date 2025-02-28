const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    User_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Drone_id: {
        type: Schema.Types.ObjectId,
        ref: 'Drone_Details'
    },
    Start_date: {
        type: Date,
        required: true
    },
    End_date: {
        type: Date,
        required: true
    },
    Price_per_day: {
        type: Number,
        required: true
    },
    Total_days: {
        type: Number
    },
    Total_price: {
        type: Number
    }
});

module.exports = mongoose.model("Cart", cartSchema);
