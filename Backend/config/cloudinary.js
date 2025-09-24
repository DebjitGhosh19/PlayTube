import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
const uploadImage = async (imagePath) => {

  cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

  try {
    if(!imagePath) return null;
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath,{resource_type: "auto"});
  
    // Remove the image from the local file system
    fs.unlinkSync(imagePath);

    return result.secure_url;
    } catch (error) {
       // Remove the image from the local file system
    fs.unlinkSync(imagePath);
      console.error(error);
    }
};
export default uploadImage;