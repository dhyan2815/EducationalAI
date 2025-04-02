import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './app.css';
import Home from './pages/Home';
import ChatPage from './pages/ChatPages';

function App() {
  return (
    <Router>
      <div className="lexend-deca min-h-screen text-gray-900">
        <nav className="p-2 text-white bg-gray-700 flex justify-between">
          <Link to="/" className="text-4xl font-normal">Tutor AI</Link>
          <div>
            {/* <Link to="/add-script" className="mr-4">Add Script</Link> */}
            {/* <Link to="/generate-media" className="text-4xl font-normal">Generate TTS</Link> */}
          </div>
        </nav>
        <div className="lexend-deca">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;