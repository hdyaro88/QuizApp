import { withStyles, makeStyles, Typography, Button } from "@material-ui/core";
import Question from "../Question";
import { useState } from "react";
import "./Main.css";
import AboutUs from "../Brand/AboutUs";
import AboutInfu from "../Influencer/AboutInflu";
import { Switch } from "../HelperFiles/Custom";
import Dimentions from "../HelperFiles/Dimentions";
import { AboutUsMobile } from "../Brand/AboutUs";
import React from "react";
import { CheckCircle } from "@material-ui/icons";
import { Grow } from "@mui/material";
import { useSelector } from "react-redux";
const useStyle = makeStyles((theme) => ({
  Question: {
    // border: "1px solid black",
    padding: "2rem",
    height: "60%",
    width: "60%",
    margin: "auto",
    alignSelf: "center",
    boxShadow: "rgba(38, 57, 77 , 0.5) 0px 0px 50px 0px",
    borderRadius: "20px",
    color: "#ffffff",
  },
  submit: {
    backgroundColor: "#000000cc",
    color: "#ffffff",
  },
  box: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  welcomeBtn: {
    backgroundColor: "#F50057",
    color: "#ffffff",
    margin: "1rem",
  },
  reload: {
    color: "#1976d2",
    margin: "1rem",
  },
  QuizEnd: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& button": {
      backgroundColor: "#000000",
      color: "#ffffff",
    },
  },
}));
export const QuesNo = withStyles({
  root: {
    fontWeight: 600,
    color: "#ffffff",
    fontSize: "26px",
    lineHeight: "28px",
  },
})(Typography);
const Main = React.memo(({ isReallyLoggedIn, data }) => {
  const classes = useStyle();
  console.log(data);
  const [currQues, setCurrQues] = useState("0");
  const { width } = Dimentions();
  const [dir, setDir] = useState("left");
  const demo = useSelector((state) => state.isDemo);
  const total = data?.length;
  const [Response, setResponse] = useState([]);
  console.log(window.innerWidth);
  return (
    <Grow in={isReallyLoggedIn}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
        {width >= 600 && (
          <div style={{ height: "35%", width: "100%", display: "flex" }}>
            <AboutUs data={data?.brand} />
          </div>
        )}
        <div
          className={classes.box}
          style={{
            height: width < 600 ? "100%" : "60%",
          }}
        >
          {width < 600 && (
            <div style={{ width: "100%", height: "30%", position: "absolute", top: 0, left: 0 }}>
              <AboutUsMobile data={data?.brand} />
            </div>
          )}
          {currQues === "0" && (
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
              <Typography align="center" style={{ fontSize: "28px" }}>
                Welcome
              </Typography>
              <Button className={classes.welcomeBtn} onClick={() => setCurrQues("1")}>
                Let's Begin
              </Button>
            </div>
          )}
          {data?.map((quest, i) => (
            <Question
              key={i}
              Qno={quest.id}
              data={quest}
              direction={dir}
              setDir={setDir}
              currQues={currQues}
              setCurrQues={setCurrQues}
              responses={Response}
              setresponse={setResponse}
            />
          ))}
          {currQues === (total + 1).toString() && (
            <div className={classes.QuizEnd}>
              {console.log(Response)}
              <Typography style={{ fontSize: "28px", textAlign: "center" }}>
                Your Response has been Submitted !
              </Typography>
              <CheckCircle fontSize="large" style={{ color: "#000000" }} />
              <Button variant="contained" className={classes.reload} onClick={() => window.location.reload()}>
                {demo ? "End Demo" : "Retake"}
              </Button>
            </div>
          )}
          {<Switch setCurrQues={setCurrQues} setDir={setDir} Qno={currQues} total={total} />}
        </div>
      </div>
    </Grow>
  );
});
export default Main;
