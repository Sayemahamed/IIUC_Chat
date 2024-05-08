import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { Button } from "@mui/material";
const Welcome = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const getAuth = async () => {
    await signInWithRedirect(auth, new GoogleAuthProvider());
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);
  return (
    <>
      <h1>Welcome</h1>
      {authenticated ? (
        <Link to={"/chat"}>
          <Button>Chat</Button>
        </Link>
      ) : (
        <Button onClick={getAuth}>Login</Button>
      )}
    </>
  );
};
export default Welcome;
