import { useEffect, useMemo, useState } from "react";
import VerifyMain from "./VerifyMain";
import { TextField, Button, makeStyles, Fade, Typography } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import verify from "../Assets/Verify.png";
import firebase from "firebase";
import { auth } from "../HelperFiles/firebase";
import { Slide } from "@material-ui/core";
import axios from "axios";
import { Alert } from '@mui/material';
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "60%",
    position: "absolute",
    top: "24%",
    maxWidth: "350px",
    padding: "1rem 0",
    width: "100%",
    margin: "60px auto 0 ",
    "& button": {
      padding: "0.2rem",
      fontSize: "22px",
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
  send: {
    borderRadius: "10px",
    margin: "1rem auto",
    width: "120px",
  },
  TextField: {
    margin: "0.5rem 0",
    borderRadius: "10px",
  },
}));
const Verify = ({ isVerified, setIsVerified, sendTo }) => {
  const [OTP, setOTP] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyle();
  const VerifyOTP = () => {
    setLoading(true);
    axios.post("/api/verify-otp", { to: `+91${sendTo}`, code: OTP }).then((res) => {
      console.log(res);
      if (res.data.status === "approved") {
        setLoading(false);
        setIsVerified(true);
      }
    });
  };
  useEffect(() => {
    setAlert("OTP has been sent to Your Phone !!");
  }, []);
  return (
    <>
      <div className={classes.upper}>
        <div style={{ position: "absolute", width: "100%", height: "100%", top: "10%", textAlign: "center" }}>
          <img src={verify} />
        </div>
      </div>
      <Fade in={!isVerified} timeout={{ enter: 1500 }} unmountOnExit mountOnEnter>
        <div className={classes.middle}>
          <Typography align="center" style={{ fontSize: "28px" }}>
            Verify
          </Typography>
        </div>
      </Fade>
      <Slide
        in={!isVerified}
        timeout={{ enter: 1000, exit: 800 }}
        direction={!isVerified ? "left" : "right"}
        unmountOnExit
        mountOnEnter
      >
        <div className={classes.root}>
          <div style={{ display: "flex", flexDirection: "column", margin: "1rem 0", width: "100%" }}>
            <TextField
              value={OTP}
              variant="outlined"
              classes={{ root: classes.TextField }}
              InputProps={{ classes: { root: classes.TextField } }}
              placeholder="Enter OTP"
              onChange={(e) => setOTP(e.target.value)}
            />
            <div style={{ margin: "auto" }} id="recaptcha" />
            <Alert style={{margin : "1rem 0"}} severity="info">{alert}</Alert>
            <Button id="verify" color="primary" variant="contained" onClick={VerifyOTP}>
              {loading && (
                <CircularProgress color="inherit" style={{ width: "20px", height: "20px", margin: "0 1rem" }} />
              )}{" "}
              VERIFY
            </Button>
          </div>
          {/* <Button className={classes.send} variant="contained" color="primary" onClick={() => setIsVerified(true)}>
        Next
      </Button> */}
        </div>
      </Slide>
    </>
  );
};
export default Verify;
