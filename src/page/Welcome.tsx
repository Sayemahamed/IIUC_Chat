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
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        height: "100svh",
      }}
    >
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        direction="column"
        spacing={2}
        borderRadius={"10px"}
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
              <Button size="large" variant="contained" color="success">
                Enter
              </Button>
            </Link>
          ) : (
            <Button size="large" variant="contained" color="success" onClick={getAuth}>
              Sign In
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
export default Welcome;
