import { Autocomplete, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../firebase/config";
import userType from "../Interfaces/userType";
import { useNavigate } from "react-router-dom";
export default function Home({ userID }: { userID: string }) {
  const [users, setUsers] = useState<userType[]>([]);
  const [userData, setUserData] = useState<userType>({
    name: "",
    uid: "",
    photoURL: "",
    email: "",
    friends: [
      {
        uid: "",
        chatNode: "",
      },
    ],
  });
  const navigation = useNavigate();
  useEffect(() => {
    if (userID === "") navigation("/");
    onValue(ref(database, "users"), (snapshot) => {
      if (snapshot.exists()) {
        setUsers(Object.values(snapshot.val()));
      }
    });
    onValue(ref(database, "users/" + userID), (snapshot) => {
      if (snapshot.exists()) {
        setUserData({
          name: snapshot.val().name,
          uid: snapshot.val().uid,
          photoURL: snapshot.val().photoURL,
          email: snapshot.val().email,
          friends: snapshot.val().friends,
        });
      } else navigation("/");
    });
  }, []);
  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, [userData]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          autoComplete
          includeInputInList
          options={users}
          getOptionLabel={(option: userType) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for friends"
              variant="outlined"
            />
          )}
          onChange={(_event, value) => {
            if (value) console.log(value);
          }}
        />
      </Grid>
    </Grid>
  );
}
