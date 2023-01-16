import { Button, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { db } from "../HelperFiles/firebase";
const useStyle = makeStyles({
  box: {
    width: "80%",
    maxWidth: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& p": {
      fontWeight: "500",
      textAlign: "center",
    },
  },
  TextField: {
    margin: "1rem",
  },
});
const FetchResponse = ({ setLoading, setResponses }) => {
  const [username, setUsername] = useState("");
  const classes = useStyle();
  const url = useLocation().search;
  const params = new URLSearchParams(url);
  const fetchResponse = async () => {
    if (username === "") {
      return;
    }
    setLoading(true);
    db.collection("Responses")
      .doc(params.get("id"))
      .collection("Users")
      .doc(username)
      .get()
      .then((res) => {
        setResponses(res.data().responses);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper className={classes.box}>
        <Typography>Whoooo!!!</Typography>
        <Typography>It seems like you just reloaded the page.</Typography>
        <Typography>Don't worry your responses are saved already.</Typography>
        <Typography>Want to see your resposes , again ?</Typography>
        <TextField
          required
          classes={{ root: classes.TextField }}
          value={username}
          placeholder="Type the username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "#F50057", color: "#ffffff", margin: "1rem" }}
          onClick={fetchResponse}
        >
          Fetch It
        </Button>
      </Paper>
    </div>
  );
};
export default FetchResponse;
