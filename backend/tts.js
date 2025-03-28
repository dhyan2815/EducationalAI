require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

async function convertTextToSpeech(text, filename) {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text: text,
        voice: "Rachel",
        model_id: "eleven_monolingual_v1",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const filePath = path.join(__dirname, "output", `${filename}.mp3`);
    fs.writeFileSync(filePath, response.data, "binary");
    console.log(`✅ Audio file saved: ${filePath}`);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

module.exports = { convertTextToSpeech };