/* const droneSchema = require("../model/DroneModel")
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

const addDrone = async(req,res) => {
    try{

    }
} */