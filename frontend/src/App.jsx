import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddScript from './pages/AddScript';
import GenerateMedia from './pages/GenerateMedia';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <nav className="p-4 bg-blue-500 text-white flex justify-between">
          <Link to="/" className="text-lg font-bold">EduBot</Link>
          <div>
            <Link to="/add-script" className="mr-4">Add Script</Link>
            <Link to="/generate-media">Generate Media</Link>
          </div>
        </nav>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-script" element={<AddScript />} />
            <Route path="/generate-media" element={<GenerateMedia />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;