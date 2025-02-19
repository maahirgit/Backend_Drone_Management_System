const multer = require("multer");
const uploadFileinCloudnary = require("../controller/CloudinaryController");
/* const path = require("path");
 *///const readData = require("../utils/readDatafromexcell")

//const studentModel = require("../models/studentModel")

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter1 = (req, file, cb) => {
  //console.log("file....",req)
  const allowedTypes = /jpeg|png|jpg|gif/;
  console.log(file.mimetype);
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) {
    return cb(null, true);
  } else {
    return cb(new Error("only images are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  //fileFilter: fileFilter1,
}).single("profilepic");

const uploadFile = async (req, res) => {
  
  
    upload(req, res, async (err) => {
      if (err) {
        ///console.log(err.message);
        res.status(500).json({
          message: "error while uploading file..",
          data:err.message
        });
      } else {
        //file upload done...
        //db logic
        //cloud...

        const cloudnaryResponse = await uploadFileinCloudnary(req.file.path);
        console.log(cloudnaryResponse)

        console.log(req.file)
        // const excellData = readData(req.file.path)
        // console.log(excellData)
        //studentModel.insertMany(excellData)
        //db.insertMany(excellData)
        console.log(req.body)
        res.status(201).json({
          message:
            "file " + req.file.originalname + " is uploaded successfully..",
          data: req.file,
          // cloundanryresponse: cloudnaryResponse,
        });
      }
    });
  
  
};

module.exports = {
  uploadFile,
};
