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
    limits : {fileSize : 1000000000}
}).single('file')

const addVendor = async(req,res) => {
    try{
        upload(req,res,async(err) => {
            if(err){
                console.log("Hello")
                res.status(500).json({
                    message : err
                })
            }
            else{
                const cloudres = await CloudinaryController.uploadImage(req.file)
                const documents_url = cloudres.secure_url
                const user_id = req.body.User_id
                const business_name = req.body.Business_name
                const business_address = req.body.Business_address
                const gst_number = req.body.Gst_number
                const verification_status = req.body.Verification_status

                const uploadObj = {
                    User_id : user_id,
                    Business_name : business_name,
                    Business_address : business_address,
                    Gst_number : gst_number,
                    Verification_status : verification_status,
                    file : documents_url
                }
                const saved = await vendorSchema.create(uploadObj)

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