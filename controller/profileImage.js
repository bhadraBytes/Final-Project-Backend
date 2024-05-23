const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { User } = require("../model/User");

const router = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original filename
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle image upload
router.post("/uploadImage", upload.single("image"), async (req, res) => {
  try {
    // Assuming user ID is obtained from the request
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.profileImage = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({ message: "Image uploaded successfully", profileImage: user.profileImage });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

module.exports = router;
