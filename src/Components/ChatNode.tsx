import { storage, database } from "../firebase/config";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, get } from "firebase/database";
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

const ChatNode = ({
  uuid,
  message,
  imageName,
}: {
  uuid: string;
  message: string;
  imageName: string;
}) => {
  const [image, setImage] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<string>("");
  useEffect(() => {
    if (imageName.length > 0) {
      getDownloadURL(storageRef(storage, imageName)).then((url) => {
        setImage(url);
      });
    }
  }, []);

  useEffect(() => {
    if (uuid.length > 0) {
      get(databaseRef(database, "users/" + uuid)).then((snapshot) => {
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
        {image && <CardMedia component={"img"} image={image} height={300} />}
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
