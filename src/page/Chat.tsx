import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database, storage } from "../firebase/config";
import { get, onValue, push, ref } from "firebase/database";
import { uploadBytes, ref as storageRef } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Divider, Grid, IconButton, InputBase, Paper } from "@mui/material";
import ChatNode from "../Components/ChatNode";
import AddIcon from "@mui/icons-material/Add";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<userType>({
    name: "",
    uid: "",
    photoURL: "",
    email: "",
  });
  const [chatNodeData, setChatNodeData] = useState<chatType[]>([]);
  const [chatData, setChatData] = useState<string>("");
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
  const chatWithImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = await event.target.files![0];
    const UUID = await uuidv4();
    await uploadBytes(storageRef(storage, UUID), file);
    await push(ref(database, chatNode), {
      uid: userData.uid,
      avatar: userData.photoURL,
      name: userData.name,
      message: chatData.trim(),
      image: UUID,
    });
  };
  return (
    <>
      <Grid container gap={1}>
        {chatNodeData.map((data, index) => (
          <ChatNode
            key={data.uid + index}
            avatar={data.avatar}
            name={data.name}
            message={data.message}
            imageName={data.image}
          />
        ))}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              bottom: 0,
              position: "fixed",
              width: "90%",
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
                    message: chatData.trim(),
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
            <IconButton
              onClick={() => inputRef.current?.click()}
              color="primary"
              sx={{ p: "10px" }}
            >
              <input
                style={{ display: "none" }}
                type="file"
                accept="image"
                ref={inputRef}
                onChange={(event) => {
                  chatWithImage(event);
                }}
              />
              <AddIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default Chat;
