import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/config";
import { get, ref } from "firebase/database";
import { Grid } from "@mui/material";
import ChatNode from "../Components/ChatNode";

interface userType {
  name: string;
  uid: string;
  photoURL: string;
  email: string;
}
const Chat = ({ userID, chatNode }: { userID: string; chatNode: string }) => {
  const [userData, setUserData] = useState<userType>({
    name: "",
    uid: "",
    photoURL: "",
    email: "",
  });
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
        console.log(chatNode);
      } else navigation("/");
    });
    if (userID === "") navigation("/");
  }, []);
  return (
    <Grid container>
      <ChatNode
        avatar={userData.photoURL}
        name={userData.name}
        message={"hellol;kjdfhaolkjdfl;aksdf;ks dfh askd fjlaksdjfalks dj flak sdjflaksdjflaksdjf.,amnd csvm,cnvxoiasdfhellol;kjdfh aolkjdfl;aksdf;ksdf haskdfjlaksdjfalk sdjflaksdjfl aksdjflaksdjf. ,amndcsvm,cnvxo iasdfhellol;kjdfha olkjdfl;ak sdf;ksdfha skdfjlaksdjf alksdjflaks djflaksdjflaks djf.,amndc svm,cnvxoiasdfhel lol;kjdfhaolkjd fl;aksdf;ksdf haskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfvvhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdfhellol;kjdfhaolkjdfl;aksdf;ksdfhaskdfjlaksdjfalksdjflaksdjflaksdjflaksdjf.,amndcsvm,cnvxoiasdf"}
        image={"https://source.unsplash.com/random"}
      />
    </Grid>
  );
};
export default Chat;
