const { object } = require("zod")
const userSchema = require("../model/UserModel")
const hashedPassword = require("../util/encrypt")
const mailutil = require("../util/MailUtil")

const createUser = async(req,res) => {
    console.log(req.body)
    const hashed = await hashedPassword.encryptPassword(req.body.Password)

    const user = Object.assign(req.body,{Password : hashed})

    const savedUser = await userSchema.create(user)
    
    await mailutil.sendMail(savedUser.Email,"Welcome to Fly Sync! We're thrilled to have you onboard. 🚀 Whether you're a drone provider looking to showcase your drones or a customer searching for the perfect drone, we're here to make your experience smooth and hassle-free. 🌟 What You Can Do Next: ✅ For Providers: List your drones and reach potential buyers. ✅ For Customers: Browse top-quality drones and make easy purchases. Start exploring today and let’s elevate the drone marketplace together! If you have any questions, feel free to reach out to us at [Support Email]. Happy flying, Fly Sync Team.")

    res.status(200).json({
        message : "User registered successfully",
        data : savedUser
    })
}

const loginUser = async(req,res) => {
    const email = req.body.Email;
    const password = req.body.Password;
    const employeebyemail = await userSchema.findOne({Email : email})

    if(employeebyemail){
        const isMatch = await hashedPassword.comparePassword(password,employeebyemail.Password)
        if(isMatch){
        res.status(200).json({
            message : "User Login Successful"
        })
        }
        else{
            res.status(200).json({
                message : "User Login Unsuccessful"
            })
        }
    }else
    {
        res.status(200).json({
            message: "user not login "
        })
    }
    
}
module.exports = {
    createUser,
    loginUser
}