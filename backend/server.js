require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { convertTextToSpeech } = require("./tts");
const { generateVideo } = require("./videoGenerator");
const ttsRoutes = require("./routes/ttsRoutes");
const videoRoutes = require("./routes/videoRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Define Schema for Scripts
const scriptSchema = new mongoose.Schema({
  class: String,
  subject: String,
  topic: String,
  script: String,
  createdAt: { type: Date, default: Date.now },
});
const Script = mongoose.model("Script", scriptSchema);

// Serve static files (for generated media)
app.use("/output", express.static(path.join(__dirname, "output")));

// (Optional) API Route for welcome homepage of backend
app.get("/", async (req, res) => {
  res.send("Welcome to Edubot backend system");
});

// API Route: Store a Script
app.post("/api/scripts", async (req, res) => {
  try {
    const { class: classLevel, subject, topic, script } = req.body;
    const newScript = new Script({ class: classLevel, subject, topic, script });
    await newScript.save();
    res
      .status(201)
      .json({ message: "✅ Script saved successfully", data: newScript });
  } catch (error) {
    res.status(500).json({ message: "❌ Error saving script", error });
  }
});

// API Route: Get All Scripts
app.get("/api/scripts", async (req, res) => {
  try {
    const scripts = await Script.find();
    res.status(200).json(scripts);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching scripts", error });
  }
});

// API Route: Generate TTS
app.get("/api/tts", async (req, res)=>{
  res.send("Checkout the /output/{filename} path for the converted speech..");
})

app.post("/api/tts", async (req, res) => {
  try {
    const { text } = req.body;
    const filename = `tts-${Date.now()}`;
    await convertTextToSpeech(text, filename);
    res
      .status(200)
      .json({ audioUrl: `http://localhost:5000/output/${filename}.mp3` });
  } catch (error) {
    res.status(500).json({ message: "❌ TTS Generation Error", error });
  }
});

// API Route: Generate Video
app.post("/api/video", async (req, res) => {
  try {
    const { text } = req.body;
    const filename = `video-${Date.now()}`;
    await generateVideo(text, filename);
    res
      .status(200)
      .json({ videoUrl: `http://localhost:5000/output/${filename}.mp4` });
  } catch (error) {
    res.status(500).json({ message: "❌ Video Generation Error", error });
  }
});

// Serve static files from 'output' folder
app.use("/output", express.static(path.join(__dirname, "output")));

// Use TTS and Video Generation Routes
app.use(ttsRoutes);
app.use(videoRoutes);

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

module.exports = router;
