import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/scripts")
      .then((response) => {
        setScripts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load scripts");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Stored Scripts</h1>

      {loading && <p>Loading scripts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {scripts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scripts.map((script) => (
            <div key={script._id} className="p-4 border rounded-lg shadow-sm bg-gray-100">
              <h2 className="text-lg font-semibold">{script.topic}</h2>
              <p className="text-gray-600">{script.subject} - Class {script.class}</p>
              <p className="mt-2 text-sm">{script.script.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No scripts found.</p>
      )}
    </div>
  );
}

export default Home;