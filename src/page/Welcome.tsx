import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { Button, Grid } from "@mui/material";
const Welcome = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const getAuth = async () => {
    await signInWithRedirect(auth, new GoogleAuthProvider());
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={2}
    >
      <Grid item>
        <h1 style={{ textAlign: "center", fontFamily: "roboto" }}>Welcome</h1>
      </Grid>
      <Grid item>
        {authenticated ? (
          <Link to={"/chat"}>
            <Button>Enter</Button>
          </Link>
        ) : (
          <Button onClick={getAuth}>Sign In</Button>
        )}
      </Grid>
    </Grid>
  );
};
export default Welcome;