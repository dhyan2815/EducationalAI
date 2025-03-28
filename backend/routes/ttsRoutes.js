const express = require("express");
const router = express.Router();
const convertTextToSpeech = require("./../tts");

router.post("/api/tts", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const filename = `tts-${Date.now()}`;
  try {
    await convertTextToSpeech(text, filename);
    res.json({ audioUrl: `/output/${filename}.mp3` });
  } catch (error) {
    res.status(500).json({ error: "Error generating TTS" });
  }
});

module.exports = router;