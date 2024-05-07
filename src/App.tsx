import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase/config";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect } from "react";
const App = () => {
  useEffect(() => {
    const getAuth = async () => {
      await signInWithRedirect(auth, new GoogleAuthProvider());
    };
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        getAuth();
      }
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<div>App</div>} />
      <Route path="/chat" element={<div>Chat</div>} />
    </Routes>
  );
};
export default App;
