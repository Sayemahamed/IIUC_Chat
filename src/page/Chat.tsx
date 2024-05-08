import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chat = ({ userID }: { userID: string }) => {
  const navigation = useNavigate();
  useEffect(() => {
    if (userID === "") navigation("/");
  }, []);
  return <div>chat with {userID}</div>;
};
export default Chat;
