import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/config";
import { get, ref } from "firebase/database";
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

interface userType {
  name: string;
  uid: string;
  photoURL: string;
  email: string;
}
const Chat = ({ userID, chatNode }: { userID: string; chatNode: string }) => {
  const [userData, setUserData] = useState<userType>({
    name: "",
    uid: "",
    photoURL: "",
    email: "",
  });
  const navigation = useNavigate();
  useEffect(() => {
    get(ref(database, "users/" + userID)).then((snapshot) => {
      if (snapshot.exists()) {
        setUserData({
          name: snapshot.val().name,
          uid: snapshot.val().uid,
          photoURL: snapshot.val().photoURL,
          email: snapshot.val().email,
        });
      } else navigation("/");
    });
    if (userID === "") navigation("/");
  }, []);
  useEffect(() => {
    console.log(userData);
    console.log(chatNode);
  }, [userData]);
  return (
    <Grid container>
      <Grid item>
        <Card>
          <CardHeader
            avatar={
              <Avatar src={userData.photoURL} sx={{ bgcolor: "red" }}>
                {userData.name.charAt(0)}
              </Avatar>
            }
            title={userData.name}
          ></CardHeader>
          <CardContent>
            <Typography variant="body2" color={"GrayText"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, repellendus dolores sit quis vel voluptate dicta consectetur in rerum officiis?
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default Chat;
