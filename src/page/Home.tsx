import { Autocomplete, Grid, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { onValue, ref, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
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
    setUsers(
      users.filter(
        (user) =>
          user.uid !== userData.uid &&
          !userData.friends.some((friend) => friend.uid === user.uid)
      )
    );
  }, [userData.friends]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: "2px 4px",
            alignItems: "center",
            position: "fixed",
            width: "93%",
          }}
        >
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
              if (value) {
                let chatNode = uuidv4();
                // console.log(value.uid + " " + userID + " " + chatNode);
                update(ref(database, "users/" + value.uid), {
                  friends: [
                    ...value.friends,
                    {
                      uid: userID,
                      chatNode: chatNode,
                    },
                  ],
                }).catch((err) => {
                  console.log(err);
                });
                update(ref(database, "users/" + userID), {
                  friends: [
                    ...userData.friends,
                    {
                      uid: value.uid,
                      chatNode: chatNode,
                    },
                  ],
                }).catch((err) => {
                  console.log(err);
                });
              }
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
