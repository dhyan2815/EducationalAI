import { useState } from "react";
import axios from "axios";

const GenerateMedia = () => {
  const [text, setText] = useState("");
  const [ttsLoading, setTtsLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const generateTTS = async () => {
    if (!text) return alert("Please enter text for TTS!");
    setTtsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/tts", { text });
      setAudioUrl(response.data.audioUrl);
    } catch (error) {
      console.error("❌ TTS Error:", error);
      alert("Failed to generate audio.");
    }
    setTtsLoading(false);
  };

  const generateVideo = async () => {
    if (!text) return alert("Please enter text for video!");
    setVideoLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/video", { text });
      setVideoUrl(response.data.videoUrl);
    } catch (error) {
      console.error("❌ Video Error:", error);
      alert("Failed to generate video.");
    }
    setVideoLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Generate Audio & Video</h2>

      {/* Input Box */}
      <textarea
        className="w-full p-3 border rounded-md mb-4"
        rows="4"
        placeholder="Enter text for TTS or Video generation..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      {/* Generate Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={generateTTS}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          disabled={ttsLoading}
        >
          {ttsLoading ? "Generating Audio..." : "Generate Audio"}
        </button>

        <button
          onClick={generateVideo}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          disabled={videoLoading}
        >
          {videoLoading ? "Generating Video..." : "Generate Video"}
        </button>
      </div>

      {/* Output Section */}
      <div className="mt-6">
        {audioUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Generated Audio:</h3>
            <audio controls src={audioUrl} className="mt-2 w-full"></audio>
          </div>
        )}

        {videoUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Generated Video:</h3>
            <video controls src={videoUrl} className="mt-2 w-full"></video>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateMedia;