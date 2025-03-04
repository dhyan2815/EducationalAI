require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require('fs')

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://dhyan_2815:T221tI8fPQ7RUnjY@edubot-cluster.ax7e3.mongodb.net/?retryWrites=true&w=majority&appName=EduBot-Cluster";

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
  createdAt: { type: Date, default: Date.now }
});

const Script = mongoose.model("Script", scriptSchema);

// Read a json file
const data = JSON.parse(fs.readFileSync("scripts.json", "utf-8"));

// Insert Multiple Data into DB
Script.insertMany(data)
  .then(()=>{
    console.log("Script inserted successfully")
  })
  .catch((err)=>{
    console.log("Error inserting script",err)
  })

// API Route: Store a Script
app.post("/api/scripts", async (req, res) => {
  try {
    const { class: classLevel, subject, topic, script } = req.body;
    const newScript = new Script({ class: classLevel, subject, topic, script });
    await newScript.save();
    res.status(201).json({ message: "✅ Script saved successfully", data: newScript });
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

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
