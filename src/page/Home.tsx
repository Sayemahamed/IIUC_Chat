import { Autocomplete, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { get, onValue, ref } from "firebase/database";
import { database } from "../firebase/config";
import userType from "../Interfaces/userType";
export default function Home() {
  const [users, setUsers] = useState<userType[]>([]);
  useEffect(() => {
    onValue(ref(database, "users"),(snapshot) => {
      if (snapshot.exists()) {
        setUsers(Object.values(snapshot.val()));
      }
    });
  }, []);
  const defaultProps = {
    options: users,
    getOptionLabel: (option: userType) => option.name,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          {...defaultProps}
          autoComplete
          includeInputInList
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for friends"
              variant="outlined"
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
