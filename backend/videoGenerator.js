require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.RUNWAY_API_KEY;

async function generateVideo(prompt, filename) {
  try {
    const response = await axios.post(
      "https://api.runwayml.com/v1/gen2/video",
      { prompt: prompt, duration: 5 },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const videoUrl = response.data.video_url;
    console.log(`✅ Video generated: ${videoUrl}`);

    // Download the video file
    const videoResponse = await axios.get(videoUrl, { responseType: "arraybuffer" });
    const filePath = path.join(__dirname, "output", `${filename}.mp4`);
    fs.writeFileSync(filePath, videoResponse.data);
    console.log(`✅ Video saved: ${filePath}`);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

module.exports = { generateVideo };