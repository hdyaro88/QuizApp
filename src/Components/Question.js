import { withStyles, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ArrowRightAlt } from "@material-ui/icons";
import { CSSTransition } from "react-transition-group";
import Options from "./Options";
import Dimentions from "./HelperFiles/Dimentions";
const useStyle = makeStyles((theme) => ({
  Question: {
    position: "absolute",
    top: "15%",
    left: "auto",
    height: "60%",
    width: "100%",
    maxWidth: "350px",
    margin: "1rem 0",
    alignSelf: "center",
    borderRadius: "20px",
    color: "#ffffff",
    "@media screen and (max-width: 600px)": {
      top: "35%",
      left: "auto",
    },
  },
  question: {
    display: "flex",
    justifyContent: "center",
    width: "80%",
    margin: "1rem 0",
    position: "absolute",
    top: "5%",
    left: "auto",
    color: "#1C4E80",
    fontSize: "28px",
    lineHeight: "30px",
    "@media screen and (max-width: 600px)": {
      justifyContent: "center",
      maxWidth: "350px",
    },
  },
  questionMobile: {
    border: "1px solid #1C4E80",
    padding: "2rem 0",
    width: "80%",
    top: "19%",
    backgroundColor: "#ffffff",
    color: "#1C4E80",
    borderRadius: "20px",
  },
}));
const Quest = withStyles({
  root: {
    fontSize: (props) => props.fontSize || "28px",
    lineHeight: (props) => props.lineHeight || "30px",
    color: "#ffffff",
    fontWeight: 500,
  },
})(Typography);
const Question = React.memo(
  ({ Qno, currQues, setCurrQues, setRetake, direction, setDir, data, retake, setresponse }) => {
    const classes = useStyle();
    const [state, setState] = useState(Qno === currQues ? true : false);
    const [selected, setSelected] = useState("");
    const { width } = Dimentions();
    useEffect(() => {
      setState(Qno === currQues ? true : false);
    }, [currQues]);
    const next = () => {
      setCurrQues((prev) => (+prev + 1).toString());
      setDir("left");
    };
    useEffect(() => {
      // console.log(selected);
      if (selected === "") {
        return;
      }
      setresponse((prev) => {
        const prevArray = [...prev];
        const currentResponse = prevArray.findIndex((res) => res.id === Qno);
        // console.log(currentResponse, Qno, selected);
        if (currentResponse >= 0) {
          prevArray[currentResponse] = { ...prevArray[currentResponse], response: selected };
          return [...prevArray];
        } else {
          // console.log(data.options);
          const newResponse = {
            id: Qno,
            question: data.question,
            response: selected,
            type: data.type,
            optionNo: data?.options?.findIndex((value) => value === selected) || "",
          };
          prevArray.push(newResponse);
          return [...prevArray];
        }
      });
    }, [selected]);
    useEffect(() => {
      if (retake) {
        setSelected("");
        setRetake(false);
      }
    });
    return (
      <>
        <CSSTransition in={state} timeout={{ enter: 1500, exit: 800 }} classNames={"fade"} unmountOnExit mountOnEnter>
          <div className={`${classes.question} ${width < 600 ? classes.questionMobile : ""}`}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                maxWidth: "100px",
                margin: "0 0.5rem",
                alignSelf: "baseline",
              }}
            >
              <Typography style={{ fontWeight: 500 }}>{Qno}. </Typography>
              <ArrowRightAlt fontSize="medium" />
            </div>
            <Typography style={{ fontSize: width < 600 ? "21px" : "21px", textAlign: "center", alignSelf: "baseline" }}>
              {data.question}
            </Typography>
          </div>
        </CSSTransition>
        <CSSTransition
          in={state}
          timeout={{ enter: 1000, exit: 800 }}
          classNames={`slide-${direction}`}
          unmountOnExit
          mountOnEnter
        >
          <div className={classes.Question}>
            <div style={{ minWidth: "320px", width: "80%", margin: "auto" }}>
              <Options
                type={data.type}
                Options={data.options}
                next={next}
                setSelected={setSelected}
                selected={selected}
              />
            </div>
          </div>
        </CSSTransition>
      </>
    );
  }
);
export default Question;
