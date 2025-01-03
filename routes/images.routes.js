import express from "express";
import fileModel from "../models/files.models.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/images", authMiddleware, async (req, res) => {
  try {
    console.log("User in images route:", req.user);

    const files = await fileModel.find({ user: req.user.id });
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Error fetching files" });
  }
});

router.get("/images/:id", authMiddleware, async (req, res) => {
  try {
    const fileId = req.params.id;

    
    const file = await fileModel.findOne({ _id: fileId, user: req.user.id });

    if (!file) {
      return res.status(404).send("File not found");
    }

    console.log("File found:", file); // Debug log

    
    if (file.path.startsWith("http")) {
      return res.redirect(file.path); // Redirect to the hosted file URL
    }

    // Serve the file for download if stored locally
    res.download(file.path, file.originalName, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        return res.status(500).send("Error downloading file");
      }
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    return res.status(500).send("Error fetching file");
  }
});

router.delete("/images/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const file = await fileModel.findByIdAndDelete(id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
