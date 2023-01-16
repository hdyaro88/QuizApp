import { Button, IconButton, makeStyles, Slide, TextField, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowRight, ArrowUpward } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { db } from "../HelperFiles/firebase";
import LandingMain from "./LandingMain";
import Loading from "./Loading";
import Question from "./Question";
export const useStyle = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    maxWidth: "320px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    "& button": {
      color: "#1976d2",
      fontSize: "18px",
    },
  },
  TextField: {
    fontSize: "24px",
    fontWeight: "500",
    width: "100%",
    padding: "0.5rem 0",
    "& input": {
      fontSize: "18px",
      lineHeight: "21.6px",
      padding: "0.5rem 1rem",
    },
  },
  option: {
    margin: "0.5rem",
    fontSize: "18px",
    lineHeight: "21.6px",
    color: "#000000",
  },
  MainBtn: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem 0",
    "& button": {
      backgroundColor: "#000000",
      color: "#ffffff",
      margin: "0.5rem",
    },
  },
  quesAdded: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& button": {
      backgroundColor: "#000000",
      color: "#ffffff",
      margin: "0.5rem",
    },
  },
});

const FormMain = ({ setError }) => {
  const dispatch = useDispatch();
  const [FormData, setFormData] = useState([{}]);
  const classes = useStyle();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [addMore, setAddMore] = useState(true);
  const [qId, setqId] = useState("");
  const [Qno, setQno] = useState(1);
  const [form, setForm] = useState(false);
  //   console.log(FormData);
  const demo = useSelector((state) => state.isDemo);
  const data = useSelector((state) => state.data);
  const DemoHandler = () => {
    setLoading(true);
    const QuizLoad = setTimeout(() => {
      dispatch({ type: "demo_control", payload: true });
      history.replace("/demo");
    }, 2000);
    return () => {
      setLoading(false);
      clearTimeout(QuizLoad);
    };
  };
  const onSubmit = (data) => {
    setLoading(true);
    dispatch({ type: "data", payload: data });
    setLoading(false);
    setAddMore(false);
  };
  const AddQuestionHandler = () => {
    setAddMore(true);
    setQno((prev) => prev + 1);
  };
  const QuizStartHandler = () => {
    setLoading(true);
    const id = new Date().valueOf();
    const docRef = db.collection("quizData").doc(id.toString());
    docRef
      .set({ questions: [...data] })
      .then(() => {
        console.log("Success !!");
        dispatch({ type: "Filled", payload: id });
        history.replace("/quizadmin");
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };
  const IdChangeHandler = async (e) => {
    e.preventDefault();
    if (qId.trim().length == 0) {
      setError("Enter Valid quiz Id");
      return;
    }
    const doc = await db.collection("quizData").doc(qId).get();
    if (doc.exists) {
      const data = doc.data();
      dispatch({ type: "Filled", payload: qId });
      data["questions"]?.map((data, i) => {
        dispatch({ type: "data", payload: data });
      });
      dispatch({ type: "quizDetails", payload: { quizId: qId, userId: "harshit" } });
      history.replace("/quizadmin");
      // console.log(data.questions);
    } else {
      setError("No such quiz exists!!");
    }
  };
  // useEffect(() => {
  //   localStorage.removeItem("context-data");
  //   console.log("removing local");
  // }, []);
  return (
    <div className={(classes.root, "topBar")}>
      {loading && <Loading message="Please wait while we prepare the quiz for you !" />}
      {!form && <LandingMain />}
      <Slide in={!form} direction="down" unmountOnExit timeout={{ enter: 500, exit: 500 }}>
        <div style={{ margin: "auto", position: "absolute", top: "250px" }}>
          <Typography style={{ fontSize: "18px", lineHeight: "21.6px", textAlign: "center", fontWeight: 500 }}>
            {" "}
            Fill the form Below or Take a demo First.
          </Typography>
          <div className={classes.MainBtn}>
            <Button variant="contained" onClick={DemoHandler}>
              Try Demo
            </Button>
            <Button variant="contained" onClick={() => setForm(true)} endIcon={<ArrowDropDown />}>
              Create a quiz
            </Button>
            <div
              style={{
                textAlign: "center",
                padding: "0.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "#000000",
                  margin: "0.5rem auto",
                }}
              >
                <h5 style={{ color: "#ffffff", padding: 0, margin: "0.2rem" }}>OR</h5>
              </div>
              <Typography style={{ fontWeight: "500", fontSize: "18px" }}>Have an Id?</Typography>
              <form onSubmit={IdChangeHandler}>
                <TextField
                  className={classes.TextField}
                  onChange={(e) => setqId(e.target.value)}
                  placeholder="Enter quiz Id"
                />
                <Button type="submit" variant="contained" endIcon={<ArrowRight />}>
                  Start Quiz
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Slide>
      {addMore ? (
        <>
          <Slide in={form} direction="up" unmountOnExit timeout={{ enter: 500, exit: 500 }}>
            <div
              style={{
                position: "absolute",
                maxWidth: "350px",
                width: "80%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                style={{ marginBottom: "1rem", backgroundColor: "#000000" }}
                onClick={() => {
                  setForm(!form);
                }}
              >
                <ArrowUpward style={{ color: "#ffffff" }} />
              </IconButton>
              <Question setError={setError} Qno={Qno} onSubmit={onSubmit} />
            </div>
          </Slide>
        </>
      ) : (
        <div className={classes.quesAdded}>
          <Alert variant="standard" severity="success">
            Question is added Successfully !.
          </Alert>
          <Button variant="contained" onClick={AddQuestionHandler}>
            Add More Question
          </Button>
          <Button variant="contained" onClick={QuizStartHandler}>
            Start Quiz
          </Button>
        </div>
      )}
    </div>
  );
};
export default FormMain;
