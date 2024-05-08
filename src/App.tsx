import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useEffect, useState } from "react";
import Welcome from "./page/Welcome";

const App = () => {
  const [userID, setUserID] = useState<string>("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        setUserID("");
      }
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/chat" element={<div>Chat with {userID}</div>} />
    </Routes>
  );
};
export default App;
