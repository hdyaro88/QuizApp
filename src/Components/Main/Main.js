import { withStyles, makeStyles, Typography, Button } from "@material-ui/core";
import Question from "../Question";
import { useEffect, useRef, useState } from "react";
import "./Main.css";
import AboutUs from "../Brand/AboutUs";
import AboutInfu from "../Influencer/AboutInflu";
import { Switch } from "../HelperFiles/Custom";
import Dimentions from "../HelperFiles/Dimentions";
import { AboutUsMobile } from "../Brand/AboutUs";
import React from "react";
import { CheckCircle } from "@material-ui/icons";
import { Grow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveResponses } from "../ApiHandlers/Handlers";
import Loading from "../Form/Loading";
import { Link, useHistory } from "react-router-dom";
import MenuMain from "../Menu/MenuMain";
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
const Main = React.memo(({ isReallyLoggedIn, data, setError }) => {
  const classes = useStyle();
  // console.log(data);
  const [currQues, setCurrQues] = useState("0");
  const [loading, setLoading] = useState(false);
  const [retake, setRetake] = useState(false);
  const history = useHistory();
  const { width } = Dimentions();
  const [dir, setDir] = useState("left");
  const demo = useSelector((state) => state.isDemo);
  const total = data?.length;
  const [Response, setResponse] = useState([]);
  const link = useSelector((state) => state.link);
  const quizInfo = useSelector((state) => state.quizDetails);
  const dispatch = useDispatch();
  const timer = useRef(null);
  // console.log(window.innerWidth);
  const retakeHandler = () => {
    setLoading(true);
    setRetake(true);
    timer.current = setTimeout(() => {
      dispatch({ type: "retake" });
      setResponse([]);
      setCurrQues("0");
    }, 300);
  };
  const endDemoHandler = () => {
    dispatch({ type: "reset" });
    history.replace("/");
  };
  useEffect(() => {
    if (+currQues >= total + 1) {
      // console.log(quizInfo);
      saveResponses(quizInfo.quizId, quizInfo.userId, Response, setLoading, dispatch);
    }
  }, [currQues]);
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  return (
    <Grow in={isReallyLoggedIn}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
        <MenuMain onRetake={retakeHandler} />
        {width >= 600 && (
          <div style={{ height: "35%", width: "100%", display: "flex" }}>
            <AboutUs link={link} data={data?.brand} />
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
              <AboutUs link={link} data={data?.brand} />
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
              retake={retake}
              setRetake={setRetake}
            />
          ))}
          {currQues === (total + 1).toString() &&
            (loading ? (
              <Loading message="Your responses are begin saved. Please wait..." />
            ) : (
              <div className={classes.QuizEnd}>
                {console.log(Response)}
                <Typography style={{ fontSize: "28px", textAlign: "center" }}>
                  Your Response has been Submitted !
                </Typography>
                <CheckCircle fontSize="large" style={{ color: "#000000" }} />
                <Button
                  variant="contained"
                  className={classes.reload}
                  onClick={() => {
                    demo ? endDemoHandler() : retakeHandler();
                  }}
                >
                  {demo ? "End Demo" : "Retake"}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => history.push(`/responses?id=${quizInfo.quizId}`)}
                  className={classes.reload}
                >
                  Show Responses
                </Button>
              </div>
            ))}
          {<Switch setCurrQues={setCurrQues} setDir={setDir} Qno={currQues} total={total} />}
        </div>
      </div>
    </Grow>
  );
});
export default Main;
