import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Mic, SendHorizonal } from 'lucide-react';

function ChatPage() {
  const location = useLocation();
  const userMessage = location.state?.message || "";
  
  const [messages, setMessages] = useState(userMessage ? [{ role: "user", content: userMessage }] : []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const effectRan = useRef(false); // Prevent duplicate API calls

  // Function to fetch AI response
  const fetchAIResponse = async (query) => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:5000/api/config");
      const apiKey = res.data.geminiApiKey;
      if (!apiKey) throw new Error("API key not found");

      const aiRes = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: query }] }] }
      );

      const aiReply = aiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
      
      setMessages(prevMessages => [...prevMessages, { role: "ai", content: aiReply }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages(prevMessages => [...prevMessages, { role: "ai", content: "Error generating response." }]);
    }
    setLoading(false);
  };

  // Prevent running twice in Strict Mode
  useEffect(() => {
    if (!userMessage.trim() || effectRan.current) return;

    effectRan.current = true; // Mark effect as run
    fetchAIResponse(userMessage);
  }, [userMessage]);

  // Handle sending new messages
  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages(prevMessages => [...prevMessages, newMessage]); // Add user message to chat

    setInput(""); // Clear input field
    fetchAIResponse(input); // Fetch AI response
  };

  return (
    <div className="bg-gray-700 flex flex-col items-center p-6 relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}></div>

      {/* Chat Container */}
      <h1 className="text-3xl text-white font-bold mb-4 relative z-10">Your Learnings</h1>

      {/* Messages Display */}
      <div className="w-full max-w-2xl p-4 rounded-md h-[500px] bg-opacity-80 backdrop-blur-md relative z-10 overflow-y-auto scrollbar-hide">
        {messages.map((msg, index) => (
          <div key={index} className={`p-3 my-2 text-lg rounded-md ${msg.role === "user" ? "text-blue-300" : "text-white"}`}>
            <strong>{msg.role === "user" ? "You" : "Tutor"}:</strong> {msg.content}
          </div>
        ))}
        {loading && <p className="text-gray-400">Thinking...</p>}
      </div>

      {/* Input Box */}
      <div className="w-full max-w-xl relative flex items-center gap-2 mt-6 z-10">
        <input
          type="text"
          placeholder="Ask here to learn more..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full py-4 px-6 bg-gray-200 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
        />
        <button className="p-2 rounded-full bg-gray-200 transition-colors cursor-pointer">
          <Mic className="w-6 h-6 text-gray-700" />
        </button>
        <button
          className={`p-2 rounded-full transition-colors cursor-pointer ${loading ? "bg-gray-400" : "bg-gray-200"}`}
          onClick={handleSendMessage}
          disabled={loading}
        >
          <SendHorizonal className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}

export default ChatPage;