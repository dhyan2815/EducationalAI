require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

const API_KEY = process.env.ELEVENLABS_API_KEY; 
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

async function convertTextToSpeech(text, filename) {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text: text,
        voice: "Rachel", // Change voice if needed
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

    fs.writeFileSync(`output/${filename}.mp3`, response.data, "binary");
    console.log(`✅ Audio file saved: output/${filename}.mp3`);
  } catch (error) {
    console.error("❌ Error:", error.response.data);
  }
}

// Example Usage
convertTextToSpeech("Gravity is the force that pulls things towards Earth.", "gravity-lesson");
