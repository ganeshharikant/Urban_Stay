require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// ✅ ABSOLUTE, SAFE FILE PATH
const filePath = path.resolve(__dirname, "test.jpg");

console.log("Uploading from:", filePath);

cloudinary.uploader.upload(filePath, {
  folder: "test_uploads"
})
.then(result => {
  console.log("✅ Upload Success:");
  console.log(result);
})
.catch(err => {
  console.log("❌ Upload Failed:");
  console.error(err);
});