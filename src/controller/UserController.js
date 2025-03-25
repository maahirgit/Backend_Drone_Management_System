const userSchema = require("../model/UserModel");
const hashedPassword = require("../util/encrypt");
const mailutil = require("../util/MailUtil");
const tokenUtil = require("../util/tokenUtil");
const tokenSchema = require("../model/TokenModel");
const mail = require("../util/MailUtil");
const otpModel = require("../model/AuthModel");  



const createUser = async (req, res) => {
    try {
        const hashed = await hashedPassword.encryptPassword(req.body.Password);
        const user = Object.assign(req.body, { Password: hashed });
        const savedUser = await userSchema.create(user);

        await mailutil.sendMail(
            savedUser.Email,
            "Welcome to Fly Sync! We're thrilled to have you onboard. 🚀"
        );

        res.status(200).json({
            message: "User registered successfully",
            data: savedUser,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user." });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await userSchema.findOne({ Email: req.body.Email });

        if (!user) {
            return res.status(404).json({ message: "User not found. Please register first." });
        }

        const isMatch = await hashedPassword.comparePassword(req.body.Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        await tokenSchema.deleteMany({ userId: user._id });
        const token = tokenUtil.generateToken(user.toObject());

        const setdata = await tokenSchema.create({ token, userId: user._id });

        const populatedData = await tokenSchema.findById(setdata._id).populate("userId");

        res.status(200).json({ message: "Login Successful", data: populatedData });
        // res.status(200).json({ message: "Login Successful", setdata });
    } catch (error) {
        res.status(500).json({ message: "Error during login." });
    }
};

const logoutUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(400).json({ message: "Token is required for logout." });
        }

        const deletedToken = await tokenSchema.findOneAndDelete({ token });
        if (!deletedToken) {
            return res.status(400).json({ message: "Invalid token or already logged out." });
        }

        res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        res.status(500).json({ message: "Error during logout." });
    }
};

const getUser = async (req, res) => {
    try {
        const data = await userSchema.find().populate('Role_id');
        res.status(200).json({ message: "Users fetched successfully", data });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users." });
    }
};


const forgotPassword = async (req, res) => {
    try {
        const Otp = Math.floor(1000 + Math.random() * 9000);  // Generate 4-digit OTP
        const emailEntered = req.body.Email;
        const emailData = await userSchema.findOne({ Email: emailEntered });

        if (emailData) {
            await mail.sendMail(emailEntered, "Forgot Password", `<h1>Your OTP is ${Otp}</h1>`);

            const otpObj = {
                Otp: Otp,
                Email: emailEntered,
                Time: new Date()
            };
            await otpModel.create(otpObj);

            res.status(200).json({
                message: "Mail sent successfully"
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        console.error("Error in forgot password:", error);
        res.status(500).json({
            message: "An error occurred while sending the OTP."
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { Otp, Email, Password } = req.body;

        const otpData = await otpModel.findOne({ Otp: Otp, Email: Email });

        if (otpData) {
            console.log(Password)
            const hashed = await hashedPassword.encryptPassword(Password);
            
            const updateUser = await userSchema.findOneAndUpdate(
                { Email: Email },
                { Password: hashed }
            );

            res.status(200).json({
                message: "Password reset successful"
            });
        } else {
            res.status(404).json({
                message: "Invalid OTP or OTP has expired."
            });
        }
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({
            message: "An error occurred while resetting the password."
        });
    }
}


module.exports = { createUser, loginUser, getUser, logoutUser, resetPassword, forgotPassword};
