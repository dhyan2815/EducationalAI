const express = require("express");
const router = express.Router();
const generateVideo = require(".././videoGenerator");

router.post("/api/video", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const filename = `video-${Date.now()}`;
  try {
    await generateVideo(text, filename);
    res.json({ videoUrl: `/output/${filename}.mp4` });
  } catch (error) {
    res.status(500).json({ error: "Error generating video" });
  }
});

module.exports = router;
