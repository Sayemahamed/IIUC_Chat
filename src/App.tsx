import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>App</div>} />
      <Route path="/chat" element={<div>Chat</div>} />
    </Routes>
  );
};
export default App;
