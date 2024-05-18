import { storage } from "../firebase/config";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
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
  avatar,
  name,
  message,
  imageName,
}: {
  avatar: string;
  name: string;
  message: string;
  imageName: string;
}) => {
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    if (imageName.length > 0) {
      getDownloadURL(storageRef(storage, imageName)).then((url) => {
        setImage(url);
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
