import { useEffect, useState } from "react";
import axios from "axios";

type Story = {
  id: number;
  prompt: string;
  response: string;
  created_at: string;
};

type Pagination = {
  current_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
};

const StoryList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    total_pages: 1,
    has_next: false,
    has_previous: false,
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchStories = async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(`${API_URL}/completions?page=${page}`);
      setStories(data.completions);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch stories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handlePageChange = (page: number) => {
    fetchStories(page);
  };

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">📚 Recent Stories</h2>

      {loading && <p className="text-blue-500 font-medium">Loading stories…</p>}
      {error && <p className="text-red-600 font-medium mb-2">⚠️ {error}</p>}

      <div className="divide-y divide-gray-200">
        {stories.map((story) => (
          <div key={story.id} className="py-4 cursor-pointer">
            <div
              onClick={() => toggleExpand(story.id)}
              className="flex justify-between items-center"
            >
              <div className="text-sm text-gray-600">
                <strong>Prompt:</strong> {story.prompt}
              </div>
              <span className="text-xs text-gray-400">
                {new Date(story.created_at).toLocaleString()}
              </span>
            </div>

            {expandedId === story.id && (
              <div className="mt-2 text-gray-700 whitespace-pre-wrap">
                {story.response}
              </div>
            )}
          </div>
        ))}
      </div>

      {!loading && !stories.length && (
        <p className="text-gray-500 mt-4">No stories have been generated yet.</p>
      )}

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={() => handlePageChange(pagination.current_page - 1)}
          disabled={!pagination.has_previous}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {pagination.current_page} of {pagination.total_pages}
        </span>
        <button
          onClick={() => handlePageChange(pagination.current_page + 1)}
          disabled={!pagination.has_next}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StoryList;



// import { useEffect, useState } from "react";
// import axios from "axios";

// type Story = {
//   id: number;
//   prompt: string;
//   response: string;
//   created_at: string;
// };

// const StoryList: React.FC = () => {
//   const [stories, setStories] = useState<Story[]>([]);
//   const [expandedId, setExpandedId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const API_URL = import.meta.env.VITE_API_URL;

//   const fetchStories = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const { data } = await axios.get(`${API_URL}/completions/`);
//       setStories(data.completions);
//     } catch (err: any) {
//       setError(err.response?.data?.error || "Failed to fetch stories.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStories();
//   }, []);

//   const toggleExpand = (id: number) => {
//     setExpandedId(prev => (prev === id ? null : id));
//   };

//   return (
//     <div className="w-full bg-white shadow-lg rounded-lg p-6">
//       <h2 className="text-2xl font-bold text-blue-700 mb-4">📚 Recent Stories</h2>

//       {loading && <p className="text-blue-500 font-medium">Loading stories…</p>}
//       {error && <p className="text-red-600 font-medium mb-2">⚠️ {error}</p>}

//       <div className="divide-y divide-gray-200">
//         {stories.map((story) => (
//           <div key={story.id} className="py-4 cursor-pointer">
//             <div
//               onClick={() => toggleExpand(story.id)}
//               className="flex justify-between items-center"
//             >
//               <div className="text-sm text-gray-600">
//                 <strong>Prompt:</strong> {story.prompt}
//               </div>
//               <span className="text-xs text-gray-400">
//                 {new Date(story.created_at).toLocaleString()}
//               </span>
//             </div>

//             {expandedId === story.id && (
//               <div className="mt-2 text-gray-700 whitespace-pre-wrap">
//                 {story.response}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {!loading && !stories.length && (
//         <p className="text-gray-500 mt-4">No stories have been generated yet.</p>
//       )}
//     </div>
//   );
// };

// export default StoryList;


