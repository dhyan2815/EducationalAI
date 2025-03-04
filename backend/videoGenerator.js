require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

const API_KEY = process.env.RUNWAY_API_KEY; 

async function generateVideo(prompt, filename) {
  try {
    const response = await axios.post(
      "https://api.runwayml.com/v1/gen2/video",
      {
        prompt: prompt,
        duration: 5, // Video length in seconds
      },
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
    fs.writeFileSync(`output/${filename}.mp4`, videoResponse.data);
    console.log(`✅ Video saved: output/${filename}.mp4`);
  } catch (error) {
    console.error("❌ Error:", error.response.data);
  }
}

// Example Usage
generateVideo("A simple animated explanation of gravity.", "gravity-lesson");
