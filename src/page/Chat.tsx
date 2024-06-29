import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { database, storage } from "../firebase/config";
import { onValue, push, ref } from "firebase/database";
import { uploadBytes, ref as storageRef } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Divider, Grid, IconButton, InputBase, Paper } from "@mui/material";
import ChatNode from "../Components/ChatNode";
import AddIcon from "@mui/icons-material/Add";
import chatType from "../Interfaces/chatType";

const Chat = ({ userID }: { userID: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [chatNodeData, setChatNodeData] = useState<chatType[]>([]);
  const [chatData, setChatData] = useState<string>("");
  const [chatNode, setChatNode] = useState<string>("temp");
  const [URL, setURL] = useSearchParams();
  const navigation = useNavigate();
  useEffect(() => {
    if (
      typeof URL.get("node") === "string" &&
      String(URL.get("node")).length > 0
    ) {
      setChatNode(String(URL.get("node")));
      console.log(chatNode);
    }
  }, [URL, setURL]);
  useEffect(() => {
    if (userID === "") navigation("/");
    if (chatNode !== "temp")
      onValue(ref(database, chatNode), (snapshot) => {
        if (snapshot.exists()) {
          setChatNodeData(Object.values(snapshot.val()));
        }
      });
  }, [chatNode]);
  const chatWithImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const file = await event.target.files![0];
    const UUID = await uuidv4();
    await uploadBytes(storageRef(storage, UUID), file);
    setChatData("");
    await push(ref(database, chatNode), {
      uid: userID,
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
            uid={data.uid}
            message={data.message}
            image={data.image}
          />
        ))}
        {
          chatNode==="temp"&&<Grid item xs={12}><h1>Wait..</h1></Grid>
        }
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
                    uid: userID,
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
