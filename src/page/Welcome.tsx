import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import img from "./backGround.jpg";
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

      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
      }}
    >
      <Grid item>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Roboto",
            color: "white",
            scale: "1.5",
          }}
        >
          Welcome To
        </h1>
      </Grid>
      <Grid item>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Roboto",
            color: "white",
            scale: "1.5",
          }}
        >
          IIUC Chat
        </h1>
      </Grid>
      <Grid item>
        {authenticated ? (
          <Link to={"/chat"}>
            <Button variant="contained" color="success">
              Enter
            </Button>
          </Link>
        ) : (
          <Button variant="contained" color="success" onClick={getAuth}>
            Sign In
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
export default Welcome;
