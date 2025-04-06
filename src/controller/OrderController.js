const Order = require("../model/OrderModel");
const Drone = require("../model/DroneModel") // import drone model
const mongoose = require('mongoose');

const createOrder = async (req, res) => {
    try {
        console.log("Received a new drone order creation request.");

        const { Drone_id, Price, Days, User_id } = req.body;

        console.log("Request Body: ", req.body); // Log incoming request data

        // Check if all required fields are present
        if (!Drone_id || !Price || !Days || !User_id) {
            console.log("Missing required fields.");
            return res.status(400).json({ error: "All fields are required." });
        }

        // Validate User_id and Drone_id ObjectIds
        if (!mongoose.Types.ObjectId.isValid(User_id)) {
            console.log("Invalid User_id format: ", User_id);
            return res.status(400).json({ error: "Invalid User_id format." });
        }

        if (!mongoose.Types.ObjectId.isValid(Drone_id)) {
          console.log("Invalid Drone_id format: ", Drone_id);
          return res.status(400).json({error: "Invalid Drone_id format."})
        }

        console.log("User_id and Drone_id are valid ObjectIds.");

        // Calculate Total Price
        const Total_price = Price * Days;

        // Create a new order instance
        const newOrder = new Order({
            Drone_id: new mongoose.Types.ObjectId(Drone_id),
            Price: Price,
            Days: Days,
            User_id: new mongoose.Types.ObjectId(User_id),
            Total_price: Total_price // use the calculated total price.
        });

        console.log("New Order Object Created: ", newOrder);

        // Save the order to the database
        await newOrder.save();
        console.log("Order saved successfully to the database.");

        res.status(201).json({ message: "Order created successfully", order: newOrder });

    } catch (error) {
        console.error("Error placing order: ", error.message);
        res.status(500).json({ error: "Failed to place order. Please try again later." });
    }
};

const getOrder = async (req, res) => {
    try {
        const getOrder = await Order.find().populate('Drone_id').populate('User_id'); // Populate Drone_id and User_id
        if (getOrder) {
            res.status(200).json({
                message: "Order Fetched Successfully",
                data: getOrder
            });
        } else {
          res.status(404).json({message: "No orders found."})
        }
    } catch (error) {
      console.error("Error fetching orders: ", error.message)
      res.status(500).json({error: "Failed to fetch orders. Please try again later."})
    }
};

module.exports = {
    createOrder,
    getOrder
};
