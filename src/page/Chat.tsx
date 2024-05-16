import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/config";
import { get, onValue, push, ref } from "firebase/database";
import { Divider, Grid, IconButton, InputBase, Paper } from "@mui/material";
import ChatNode from "../Components/ChatNode";
import AddIcon from '@mui/icons-material/Add';
interface userType {
  name: string;
  uid: string;
  photoURL: string;
  email: string;
}
interface chatType {
  uid: string;
  avatar: string;
  name: string;
  message: string;
  image: string;
}
const Chat = ({ userID, chatNode }: { userID: string; chatNode: string }) => {
  const [userData, setUserData] = useState<userType>({
    name: "",
    uid: "",
    photoURL: "",
    email: "",
  });
  const [chatNodeData, setChatNodeData] = useState<chatType[]>([]);
  const [chatData, setChatData] = useState("");
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
    onValue(ref(database, chatNode), (snapshot) => {
      if (snapshot.exists()) {
        setChatNodeData(Object.values(snapshot.val()));
      }
    });
  }, []);
  return (
    <>
      <Grid container gap={1}>
        {chatNodeData.map((data) => (
          <ChatNode
            key={data.uid}
            avatar={data.avatar}
            name={data.name}
            message={data.message}
            image={data.image}
          />
        ))}
      </Grid>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          bottom: 0,
          position: "fixed",
          width: "98%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter your message"
          onChange={(event) => setChatData(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && chatData.trim() !== "") {
              push(ref(database, chatNode), {
                uid: userData.uid,
                avatar: userData.photoURL,
                name: userData.name,
                message: chatData,
                image: "",
              });
              setChatData("");
            }
          }}
          color="success"
          id="standard-basic"
          value={chatData}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }}>
          <AddIcon />
        </IconButton>
      </Paper>
    </>
  );
};
export default Chat;
