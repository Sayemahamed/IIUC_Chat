import { Avatar, Card, CardHeader, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { database } from "../firebase/config";
import { get, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";

export let FriendNode = ({
  uid,
  chatNode,
}: {
  uid: string;
  chatNode: string;
}) => {
  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigation = useNavigate();

  useEffect(() => {
    if (uid.length > 0) {
      get(ref(database, "users/" + uid)).then((snapshot) => {
        if (snapshot.exists()) {
          setAvatar(snapshot.val().photoURL);
          setName(snapshot.val().name);
          setEmail(snapshot.val().email);
        }
      });
    }
  }, []);
  return (
    <Grid item xs={12}>
      <Card
        sx={{ maxWidth: 1200, backgroundColor: "transparent" }}
        variant="elevation"
        elevation={20}
        onClick={() => {
          navigation("/chat/" + "?node=" + chatNode);
        }}
      >
        <CardHeader
          avatar={<Avatar src={avatar}>{name.charAt(0)}</Avatar>}
          titleTypographyProps={{ color: "white" }}
          title={name}
          subheader={email}
          subheaderTypographyProps={{ color: "white" }}
        ></CardHeader>
      </Card>
    </Grid>
  );
};
