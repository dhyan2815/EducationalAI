import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, SendHorizonal } from 'lucide-react';

function Home() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!input.trim()) return;
    navigate('/chat', { state: { message: input } });
  };

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center justify-center">
      <div className="illustration mb-10">
        <img src="/Illustrations.png" alt="Illustration logo" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-10">
        How can I support your learning?
      </h1>

      {/* Prompt Input */}
      <div className="w-full max-w-xl relative flex items-center gap-2">
        <input
          type="text"
          placeholder="Need help in a topic?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full py-4 px-6 bg-gray-200 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
        />
        <button className="p-2 rounded-full bg-gray-200 transition-colors cursor-pointer">
          <Mic className="w-6 h-6 text-gray-700" />
        </button>
        <button
          className={`p-2 rounded-full transition-colors cursor-pointer ${input.trim() ? "bg-gray-200" : "bg-gray-400"}`}
          onClick={handleSendMessage}
          disabled={!input.trim()}
        >
          <SendHorizonal className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}

export default Home;