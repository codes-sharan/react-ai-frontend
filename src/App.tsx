import { useState } from "react";
import StoryGenerator from "./StoryGenerator";
import StoryList from "./StoryList";

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh); // Trigger state change to refresh story list
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-4 py-10 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StoryGenerator onStoryGenerated={handleRefresh} />
        <StoryList key={refresh.toString()} /> {/* re-render when toggled */}
      </div>
    </div>
  );
};

export default App;

