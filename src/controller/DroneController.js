const droneSchema = require("../model/DroneModel");
const multer = require("multer");
const CloudinaryController = require("../controller/CloudinaryController");

const Storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
  limits: { fileSize: 10000000 },
}).single("Images");

const addDrone = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log("Multer error:", err);
      return res.status(500).json({ message: "File upload failed", error: err });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      // Upload image to Cloudinary
      const cloudres = await CloudinaryController.uploadFileinCloudnary(req.file);
      const droneimage = cloudres.secure_url;

      const { Drone_name, Drone_brand, Drone_description, Price_per_hour, Price_per_day, Availability } = req.body;

      if (!Drone_name || !Drone_brand || !Drone_description || !Price_per_day || !Availability) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const uploadObj = {
        Drone_name,
        Drone_brand,
        Drone_description,
        Price_per_hour: Price_per_hour || 0, // Default value if not provided
        Price_per_day,
        Availability,
        Images: droneimage,
      };

      console.log("Uploading to DB:", uploadObj);
      const saved = await droneSchema.create(uploadObj);

      return res.status(201).json({ data: saved });
    } catch (e) {
      console.log("Server Error:", e);
      return res.status(500).json({ message: "Internal Server Error", error: e.message });
    }
  });
};

module.exports = { addDrone };
