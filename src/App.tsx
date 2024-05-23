import { Route, Routes } from "react-router-dom";
import Memotest from "./screens/memotest/Memotest";
import WordsPerMinute from "./screens/wpm/WordsPerMinute";
import Welcome from "./screens/welcome/Welcome";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/wpm" element={<WordsPerMinute />} />
        <Route path="/memotest" element={<Memotest />} />
      </Routes>
    </div>
  );
}

export default App;
