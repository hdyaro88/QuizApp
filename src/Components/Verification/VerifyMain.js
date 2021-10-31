import { Fade, makeStyles, Slide, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Continue from "./Continue";
import Invite from "./Invite";
import SignIn from "./SignIn/SignIn";
import Verify from "./Verify";
import Main from "../Main/Main";
import { data } from "../SampleData";
import { useDispatch, useSelector } from "react-redux";
const useStyle = makeStyles((theme) => ({
  upper: {
    width: "100%",
    height: "25%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#FFE6DB",
    overflow: "hidden",
  },
  middle: {
    position: "absolute",
    border: "1px solid #1C4E80",
    padding: "1rem 0",
    width: "80%",
    maxWidth: "350px",
    height: "60px",
    top: "20%",
    left: "auto",
    backgroundColor: "#ffffff",
    color: "#1C4E80",
    borderRadius: "20px",
    zIndex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  lower: {
    position: "absolute",
    top: "24%",
    height: "75%",
    width: "100%",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "10px 10px 0 0",
    overflow: "hidden",
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
  },
}));
const VerifyMain = React.memo(() => {
  const classes = useStyle();

  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isVerified, setIsVerified] = useState(true);
  const [sendTo, setSendTo] = useState("");
  const [withBrowser, setWithBrowser] = useState(false);
  const [inviteAccepted, setInviteAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useSelector(state => state.isReallyLoggedIn);
  const quizData = useSelector(state => state.data)
  useEffect(() => {
    if (isVerified) {
      dispatch({type : "LogIn"});
    }
  }, [isVerified]);
  return (
    <div className={classes.root}>
      {!inviteAccepted ? (
        <Invite inviteAccepted={inviteAccepted} setInviteAccepted={setInviteAccepted} />
      ) : !withBrowser ? (
        <Continue withBrowser={withBrowser} setWithBrowser={setWithBrowser} />
      ) : !isLoggedIn ? (
        <SignIn SendTo={setSendTo} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      ) : !isVerified ? (
        <Verify sendTo={sendTo} isVerified={isVerified} setIsVerified={setIsVerified} />
      ): <Main isReallyLoggedIn={login} data={data } />}
    </div>
  );
});
export default VerifyMain;
