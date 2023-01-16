import { ClassNames } from "@emotion/react";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { Fade } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import "../Main/Main.css";
import React from "react";
const useStyle = makeStyles({
  textbox: {
    margin: "1rem 0",
    width: "100%",
  },
  btn_root: {
    backgroundColor: "#F50057",
    color: "white",
    margin: "auto",
  },
  TextField: {
    width: "100%",
    margin: "1rem 0",
    "& input": {
      fontWeight: 500,
      fontSize: "18px",
    },
  },
  underline: {
    "&:before": {
      borderBottom: "1px solid #ffffff",
    },
  },
});
const UserInfo = React.memo(({ userLogin }) => {
  const [username, setUsername] = useState();
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState();
  const classes = useStyle();
  const url = useLocation().search;
  const params = new URLSearchParams(url);
  const dispatch = useDispatch();
  const startQuizHandler = () => {
    dispatch({ type: "quizDetails", payload: { quizId: params.get("id"), userId: username } });
    setShow(false);
  };
  // console.log(show, "heeellele");
  useEffect(() => {
    if (!show) {
      userLogin(true);
    }
  }, [show]);
  return (
    <div className="topBar">
      <Fade in={show} unmountOnExit mountOnEnter>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <form onSubmit={startQuizHandler} style={{ textAlign: "center" }}>
            <div className={classes.textbox}>
              <Typography variant="h6" align="center">
                Please enter your name
              </Typography>
              <TextField
                required
                InputProps={{
                  classes: { underline: classes.underline },
                  startAdornment: <PersonIcon style={{ margin: "0 1rem 0 0" }} />,
                }}
                color="secondary"
                className={classes.TextField}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={classes.textbox}>
              <Typography variant="h6" align="center">
                Please enter your email
              </Typography>
              <TextField
                InputProps={{
                  classes: { underline: classes.underline },
                  startAdornment: <EmailIcon style={{ margin: "0 1rem 0 0" }} />,
                }}
                color="secondary"
                className={classes.TextField}
              />
            </div>
            <Button type="submit" variant="contained" className={classes.btn_root}>
              Enter the Quiz
            </Button>
          </form>
        </div>
      </Fade>
    </div>
  );
});
export default UserInfo;
