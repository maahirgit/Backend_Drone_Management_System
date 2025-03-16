const cartSchema = require("../model/CartModel");

const createCart = async (req, res) => {
    try {
        const { User_id, Drone_id, Start_date, End_date, Price_per_day } = req.body;

        // Validation: Ensure required fields are present
        if (!User_id || !Drone_id || !Start_date || !End_date || !Price_per_day) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Convert date strings to Date objects
        const startDate = new Date(Start_date);
        const endDate = new Date(End_date);

        // Ensure End_date is after Start_date
        if (endDate <= startDate) {
            return res.status(400).json({ message: "End date must be after start date" });
        }

        // Calculate total days
        const timeDiff = endDate - startDate; // Difference in milliseconds
        const Total_days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

        // Calculate total price
        const Total_price = Total_days * Price_per_day;

        // Create cart entry
        const savedCart = await cartSchema.create({
            User_id,
            Drone_id,
            Start_date: startDate,
            End_date: endDate,
            Price_per_day,
            Total_days,
            Total_price
        });

        res.status(201).json({
            message: "Cart Created Successfully",
            data: savedCart
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating cart", error: error.message });
    }
};




module.exports = {
    createCart
};
