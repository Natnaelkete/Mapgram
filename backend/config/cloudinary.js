const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "webp"],
  },
});

const storageForProfile = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile",
    allowed_formats: ["jpg", "png", "webp"],
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

module.exports = { cloudinary, storage, storageForProfile };
