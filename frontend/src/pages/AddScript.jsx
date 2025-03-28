import { useState } from "react";
import axios from "axios";

function AddScript() {
  const [formData, setFormData] = useState({
    class: "",
    subject: "",
    topic: "",
    script: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/scripts", formData);
      setMessage("✅ Script added successfully!");
      setFormData({ class: "", subject: "", topic: "", script: "" });
    } catch (error) {
      setMessage("❌ Failed to add script.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add a New Script</h1>

      {message && <p className="mb-4 text-center text-blue-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="class" placeholder="Class" value={formData.class} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="topic" placeholder="Topic" value={formData.topic} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="script" placeholder="Script Content" value={formData.script} onChange={handleChange} className="w-full p-2 border rounded h-32" required />
        
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Save Script
        </button>
      </form>
    </div>
  );
}

export default AddScript;
