const droneSchema = require("../model/DroneModel")
const multer = require('multer')
const CloudinaryController = require("../controller/CloudinaryController")

const Storage = multer.diskStorage({
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage : Storage,
    limits : {fileSize : 10000000}
}).array('Images',5)

const addDrone = async(req,res) => {
    try{
        upload(req,res,async(err) => {
            if(err){
                res.status(500).json({
                    messgage : err
                })
            }
            else{
                const cloudres = await CloudinaryController.uploadFileinCloudnary(req.file)
                const droneimage = cloudres.secure_url
                const drone_name = req.body.Drone_name
                const drone_brand = req.body.Drone_brand
                const drone_description = req.body.Drone_description
                const price_per_day = req.body.Price_per_day
                const availability = req.body.Availability

                const uploadObj = {
                    Drone_name : drone_name,
                    Drone_brand : drone_brand,
                    Drone_description : drone_description,
                    Price_per_day : price_per_day,
                    Availability : availability,
                    Images : droneimage
                }

                const saved = await droneSchema.create(uploadObj)

                res.status(201).json({
                    data : saved
                })
            }
        })
    }catch(e){
        res.status(404).json({
            message : e
        })
    }
}

const getDrone = async(req,res) => {
    const saved = await droneSchema.find()

    if(saved){
        res.status(200).json({
            message : "Drones Fetched Successfullly",
            data : saved
        })
    }
    else{
        res.status(401).json({
            message : "Error in fetching drones"
        })
    }
}

module.exports = {
    addDrone,
    getDrone
}