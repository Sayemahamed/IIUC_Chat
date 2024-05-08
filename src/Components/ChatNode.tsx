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
    <Grid item xs={12} md={11} lg={10} sx={{ mx: "auto" }}>
      <Card
        sx={{ maxWidth: 1200, backgroundColor: "transparent" }}
        variant="elevation"
        elevation={10}
      >
        <CardHeader
          avatar={
            <Avatar src={avatar} sx={{ bgcolor: "red" }}>
              {name.charAt(0)}
            </Avatar>
          }
          titleTypographyProps={{color:"white"}}
          title={name}
        ></CardHeader>
        {image && <CardMedia component={"img"} image={image} height={300} />}
        <CardContent>
          {message && (
            <Typography
              variant="body1"
              color={"white"}
              //   bgcolor={"teal"}
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
