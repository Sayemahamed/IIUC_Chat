import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { database } from "../firebase/config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { ref, get, set, update } from "firebase/database";
const Welcome = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);

  const getAuth = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        get(ref(database, "users/" + user.uid)).then((snapshot) => {
          if (!snapshot.exists()) {
            set(ref(database, "users/" + user.uid), {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              friends: [],
            });
          } else {
            update(ref(database, "users/" + user.uid), {
              photoURL: user.photoURL,
            });
          }
        });
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
          IIUC CHAT
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
          <Button
            size="large"
            variant="contained"
            color="success"
            onClick={getAuth}
          >
            Sign In
          </Button>
        )}
      </Grid>
      <Grid item>
        {authenticated && (
          <Button
            size="large"
            variant="outlined"
            color="secondary"
            onClick={getAuth}
          >
            Switch User
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
export default Welcome;
