import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { Button, Grid, Typography } from "@mui/material";
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
    <Grid
      container
      justifyContent="flex-start"
      alignItems="center"
      direction="column"
      spacing={2}
      bgcolor={"#f5f5f5"}
      height={"100vh"}
    >
      <Grid item>
        <h1 style={{ textAlign: "center", fontFamily: "Roboto" }}>
          Welcome To
        </h1>
      </Grid>
      <Grid item>
        <h1 style={{ textAlign: "center", fontFamily: "Roboto" }}>
         IIUC Chat
        </h1>
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
