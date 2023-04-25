var cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const deletePhoto = (id) => {
  return cloudinary.uploader.destroy(id).then((result) => {
    return true;
  });
};

module.exports = { deletePhoto };
