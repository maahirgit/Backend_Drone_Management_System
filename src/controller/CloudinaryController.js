const cloudnary = require("cloudinary").v2;

const uploadFileinCloudnary = async (file) => {
  cloudnary.config({
    cloud_name: "dnklrceyc",
    api_key: "687117512481165",
    api_secret: "BybWuJQqGr_nuXpfHYEi_VTHcJE",
  });

  const response = await cloudnary.uploader.upload(file.path);

  return response;
};
module.exports={uploadFileinCloudnary}