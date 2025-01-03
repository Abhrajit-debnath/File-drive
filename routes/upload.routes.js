import express from "express";
import fileModel from "../models/files.models.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", authMiddleware, upload.single("file"), (req, res) => {
  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      async (err, cloudinaryResult) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          return res
            .status(500)
            .json({ error: "File upload to Cloudinary failed" });
        }

        try {
          const file = await fileModel.create({
            path: cloudinaryResult.secure_url,
            originalName: req.file.originalname,
            user: req.user.id,
          });
          res.status(200).json({ message: "File uploaded successfully", file });
        } catch (dbError) {
          console.error("Database error:", dbError);
          res
            .status(500)
            .json({ error: "Error saving file information to the database" });
        }
      }
    );
    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("Upload process error:", error);
    res.status(500).json({ error: "Error processing upload" });
  }
});

export default router;
