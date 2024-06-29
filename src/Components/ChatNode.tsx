import { storage, database } from "../firebase/config";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, get } from "firebase/database";
import chatType from "../Interfaces/chatType";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const ChatNode = ({ uid, message, image }: chatType) => {
  const [imageURL, setImageURL] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<string>("");
  useEffect(() => {
    if (image.length > 0) {
      getDownloadURL(storageRef(storage, image)).then((url) => {
        setImageURL(url);
      });
    }
  }, []);

  useEffect(() => {
    if (uid.length > 0) {
      get(databaseRef(database, "users/" + uid)).then((snapshot) => {
        if (snapshot.exists()) {
          setAvatar(snapshot.val().photoURL);
          setName(snapshot.val().name);
        }
      });
    }
  }, []);
  return (
    <Grid item xs={12} md={11} lg={10} sx={{ mx: "auto" }}>
      <Card
        sx={{ maxWidth: 1200, backgroundColor: "transparent" }}
        variant="elevation"
        elevation={20}
      >
        <CardHeader
          avatar={
            <Avatar src={avatar} sx={{ bgcolor: "red" }}>
              {name.charAt(0)}
            </Avatar>
          }
          titleTypographyProps={{ color: "white" }}
          title={name}
        ></CardHeader>
        {imageURL && (
          <CardMedia component={"img"} image={imageURL} height={300} />
        )}
        <CardContent>
          {message && (
            <Typography
              borderRadius={2}
              p={1}
              variant="body1"
              color={"white"}
              bgcolor={"rgba(25, 118, 210, 0.2)"}
            >
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};
export default ChatNode;
