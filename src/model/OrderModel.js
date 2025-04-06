const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    User_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    Drone_id: {
        type: Schema.Types.ObjectId,
        ref: 'Drone_details', // Assuming you have a 'Drone' model
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Days: {
        type: Number,
        required: true,
    },
    Total_price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
