import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.API_KEY);

cloudinary.config({
  cloud_name: "dcsrvev2l",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;
