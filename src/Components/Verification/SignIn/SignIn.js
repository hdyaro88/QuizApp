import VerifyMain from "../VerifyMain";
import signin from "../../Assets/signIn.png";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import CountrySelect from "./CountrySelect";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { auth } from "../../HelperFiles/firebase";
import firebase from "firebase";
import { Slide, Fade } from "@material-ui/core";
import axios from "axios";
import { countries } from "./CountryJson";
import { ArrowDropDown } from "@material-ui/icons";
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    maxWidth: "350px",
    top: "24%",
    padding: "1rem",
    width: "100%",
    height: "60%",
    margin: "60px auto 0 ",
    overflow: "scroll",
    "& button": {
      padding: "0.2rem",
      fontSize: "22px",
    },
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
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
  btn_root: {},
  send: {
    borderRadius: "10px",
    margin: "1rem auto",
    width: "120px",
  },
  TextField: {
    margin: "0.5rem 0",
    borderRadius: "10px",
    color: "#000000",
    width: "100%",
    padding: "0 0 0 1rem",
  },
  TextField_input: {
    borderRadius: "10px",
    width: "100%",
  },
}));
const SignIn = React.memo(({ isLoggedIn, setIsLoggedIn, SendTo }) => {
  const classes = useStyle();
  const [Phone, setPhone] = useState("");
  const [country, setCountry] = useState("+91");
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(country + Phone);
  const FetchOTP = () => {
    setLoading(true);
    if (Phone.trim().length < 10) {
      setAlert({ message: "Minimum Phone Length Should be 10", type: "warning" });
      return;
    }
    SendTo(Phone);
    axios.post("/api/send-otp", { to: country + Phone }).then((res) => {
      console.log(res);
      if (res.data.status === "pending") {
        setLoading(false);
        setIsLoggedIn(true);
      }
    });
  };

  return (
    <>
      <div className={classes.upper}>
        <div style={{ position: "absolute", width: "100%", height: "100%", top: "10%", textAlign: "center" }}>
          <img src={signin} />
        </div>
      </div>
      <Fade in={!isLoggedIn} timeout={{ enter: 1500 }} unmountOnExit mountOnEnter>
        <div className={classes.middle}>
          <Typography align="center" style={{ fontSize: "28px" }}>
            Sign In
          </Typography>
        </div>
      </Fade>
      <Slide
        in={!isLoggedIn}
        timeout={{ enter: 1000, exit: 800 }}
        direction={!isLoggedIn ? "left" : "right"}
        unmountOnExit
        mountOnEnter
      >
        <div className={classes.root}>
          <div style={{ display: "flex", flexDirection: "column", margin: "1rem 0", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", margin: "1rem 0" }}>
              <CountrySelect country={setCountry} />
              <TextField
                classes={{ root: classes.TextField }}
                InputProps={{ classes: { root: classes.TextField_input } }}
                variant="outlined"
                type="number"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone"
              />
            </div>
            <div id="recaptcha"></div>
            {Object.keys(alert).length !== 0 && (
              <Alert severity={alert.type} style={{ margin: "1rem 0" }}>
                {alert.message}
              </Alert>
            )}
            <Button color="primary" onClick={FetchOTP} variant="contained">
              {loading && (
                <CircularProgress color="inherit" style={{ width: "20px", height: "20px", margin: "0 1rem" }} />
              )}{" "}
              GET OTP
            </Button>
          </div>
          {/* <Typography style={{ fontSize: "24px", margin: "0.5rem", textAlign: "center" }}>-OR-</Typography>
          <div style={{ display: "flex", flexDirection: "column", margin: "1rem 0", width: "100%" }}>
            <TextField
              variant="outlined"
              classes={{ root: classes.TextField }}
              InputProps={{ classes: { root: classes.TextField } }}
              placeholder="Enter Email"
            />
            <Button color="primary" onClick={() => setIsLoggedIn(true)} variant="contained">
              GET OTP
            </Button>
          </div> */}
        </div>
      </Slide>
    </>
  );
});
export default SignIn;
