import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/config";
import { get, onValue, push, ref } from "firebase/database";
import { Grid, TextField } from "@mui/material";
import ChatNode from "../Components/ChatNode";

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
      <TextField
        onChange={(event) => setChatData(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && chatData !== "") {
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
        focused={chatData !== ""}
        value={chatData}
        id="standard-basic"
        label="Type Your message"
        variant="standard"
      />
    </>
  );
};
export default Chat;
