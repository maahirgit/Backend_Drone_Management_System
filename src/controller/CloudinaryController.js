const cloudnary = require("cloudinary").v2;

const uploadFileinCloudnary = async (file) => {
  cloudnary.config({
    cloud_name: "dpjoxqisl",
    api_key: "292199526794599",
    api_secret: "KKZHWhEwjA1Q0zUx4gVfcsvcVRY",
  });

  const response = await cloudnary.uploader.upload(file);

  return response;
};
module.exports=uploadFileinCloudnary