import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const ChatNode = ({
  avatar,
  name,
  message,
  image,
}: {
  avatar: string;
  name: string;
  message: string;
  image: string;
}) => {
  return (
    <Grid item>
      <Card sx={{ maxWidth: 700 }}>
        <CardHeader
          avatar={
            <Avatar src={avatar} sx={{ bgcolor: "red" }}>
              {name.charAt(0)}
            </Avatar>
          }
          title={name}
        ></CardHeader>
        {image && <CardMedia component={"img"} image={image} height={300} />}
        <CardContent>
          <Typography variant="body2" color={"GrayText"}>
            {message}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default ChatNode;
