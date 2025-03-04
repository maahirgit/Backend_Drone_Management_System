const userSchema = require("../model/UserModel");
const hashedPassword = require("../util/encrypt");
const mailutil = require("../util/MailUtil");
const tokenUtil = require("../util/tokenUtil");
const tokenSchema = require("../model/TokenModel");

const createUser = async (req, res) => {
    try {
        console.log(req.body);

        // Hash the user's password before saving
        const hashed = await hashedPassword.encryptPassword(req.body.Password);

        const user = Object.assign(req.body, { Password: hashed });

        // Save user to the database
        const savedUser = await userSchema.create(user);

        // Send welcome email
        await mailutil.sendMail(
            savedUser.Email,
            "Welcome to Fly Sync! We're thrilled to have you onboard. 🚀 Whether you're a drone provider looking to showcase your drones or a customer searching for the perfect drone, we're here to make your experience smooth and hassle-free. 🌟 What You Can Do Next: ✅ For Providers: List your drones and reach potential buyers. ✅ For Customers: Browse top-quality drones and make easy purchases. Start exploring today and let’s elevate the drone marketplace together! If you have any questions, feel free to reach out to us at [Support Email]. Happy flying, Fly Sync Team."
        );

        res.status(200).json({
            message: "User registered successfully",
            data: savedUser,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "An error occurred while creating the user. Please try again.",
        });
    }
};

const loginUser = async (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;

    try {
        const user = await userSchema.findOne({ Email: email });

        if (!user) {
            return res.status(404).json({
                message: "User not found. Please register first.",
            });
        }

        // Check if password matches
        const isMatch = await hashedPassword.comparePassword(password, user.Password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect password. Please try again.",
            });
        }

        // Generate authentication token if password matches
        const token = tokenUtil.generateToken(user.toObject());

        // Store token in database
        await tokenSchema.create({
            token: token,
            userId: user._id,
        });

        res.status(200).json({
            message: "Login Successful",
            token: token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "An error occurred during login. Please try again later.",
        });
    }
};

const getUser = async(req,res) => {
    const data = await userSchema.find().populate('Role_id')
    res.status(201).json({
        message : "User fetched successfully",
        data : data
    })
}

module.exports = {
    createUser,
    loginUser,
    getUser
};
