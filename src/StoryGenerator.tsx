import { useState, FormEvent } from "react";
import axios from "axios";

interface Props {
  onStoryGenerated?: () => void; // Trigger story refresh
}

const StoryGenerator: React.FC<Props> = ({ onStoryGenerated }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [story, setStory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setStory("");

    try {
      const { data } = await axios.post(
        `${API_URL}/complete/`,
        { prompt },
        { headers: { "Content-Type": "application/json" } }
      );
      setStory(data.response);
      setPrompt("");
      onStoryGenerated?.(); // Trigger refresh in parent
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">✨ AI Story Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your story topic..."
          rows={4}
          className="p-4 text-base border border-blue-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Generating…" : "Generate Story"}
        </button>
      </form>
      {error && <p className="text-red-600 mt-4 font-medium">⚠️ {error}</p>}
      {story && (
        <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
          <h2 className="font-semibold text-blue-800 mb-2">📘 New Story</h2>
          <p className="whitespace-pre-wrap text-gray-700">{story}</p>
        </div>
      )}
    </div>
  );
};

export default StoryGenerator;
