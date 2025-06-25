import { useState, FormEvent } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [story, setStory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setStory("");

    try {
      const { data } = await axios.post(
        API_URL,
        { prompt },
        { headers: { "Content-Type": "application/json" } }
      );
      setStory(data.response);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-4 py-10 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">
          ✨ AI Story Generator
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your story topic here..."
            rows={4}
            className="p-4 text-base border border-blue-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Generating…" : "Generate Story"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">
            ⚠️ Error: {error}
          </p>
        )}

        {story && (
          <div className="mt-8 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              📘 Your Story
            </h2>
            <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
              {story}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
