import { Typography, Button, makeStyles, Slide, Fade } from "@material-ui/core";
import { useMemo } from "react";
import VerifyMain from "./VerifyMain";
import conti from "../Assets/continue.png";
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    position: "absolute",
    maxWidth: "350px",
    padding: "0.5rem",
    top: "24%",
    width: "100%",
    height: "60%",
    margin: "60px auto 0 ",
    "& button": {
      padding: "0.4rem",
      fontSize: "18px",
      color: "#575757",
      height: "50px",
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
    color: "white!important",
  },
  btn: {
    margin: "1rem 0",
  },
}));
const Continue = ({ withBrowser, setWithBrowser }) => {
  const classes = useStyle();
  return (
    <>
      <div className={classes.upper}>
        <div style={{ position: "absolute", width: "100%", height: "100%", top: "10%", textAlign: "center" }}>
          <img src={conti} />
        </div>
      </div>
      <Fade in={!withBrowser} timeout={{ enter: 1500 }} unmountOnExit mountOnEnter>
        <div className={classes.middle}>
          <Typography align="center" style={{ fontSize: "28px" }}>
            Continue
          </Typography>
        </div>
      </Fade>
      <Slide
        in={!withBrowser}
        direction={!withBrowser ? "left" : "right"}
        timeout={{ enter: 1000, exit: 800 }}
        unmountOnExit
        mountOnEnter
      >
        <div className={classes.root}>
          <div style={{ display: "flex", width: "100%", flexDirection: "column", margin: "1rem 0" }}>
            <Button disabled className={classes.btn} disableElevation variant="contained">
              continue with app
            </Button>
            <Typography style={{ fontSize: "24px", margin: "1rem", textAlign: "center" }}>-OR-</Typography>
            <Button className={classes.btn} disableElevation variant="contained" onClick={() => setWithBrowser(true)}>
              continue with browser
            </Button>
          </div>
          {/* <Button className={classes.send} variant="contained" color="primary" onClick={() => setWithBrowser(true)}>
      OK
    </Button> */}
        </div>
      </Slide>
    </>
  );
};

export default Continue;
