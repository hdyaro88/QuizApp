import { Button, makeStyles, Slide, Snackbar, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../HelperFiles/firebase";
import Dropdown from "./Dropdown";
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

const FormMain = () => {
  const dispatch = useDispatch();
  const [FormData, setFormData] = useState([{}]);
  const classes = useStyle();
  const [loading, setLoading] = useState(false);
  const [addMore, setAddMore] = useState(true);
  const [Qno, setQno] = useState(1);
  const [form, setForm] = useState(false);
  //   console.log(FormData);
  const demo = useSelector((state) => state.isDemo);
  const data = useSelector((state) => state.data);
  const DemoHandler = () => {
    setLoading(true);
    dispatch({ type: "demoStart" });
    return () => {
      setLoading(false);
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
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };
  return (
    <div className={(classes.root, "topBar")}>
      {loading && <Loading />}
      <Slide in={!form} direction="down" unmountOnExit timeout={{ enter: 100, exit: 500 }}>
        <div style={{ margin: "auto", position: "absolute" }}>
          <Typography style={{ fontSize: "18px", lineHeight: "21.6px", textAlign: "center", fontWeight: 500 }}>
            {" "}
            Fill the form Below or Take a demo First.
          </Typography>
          <div className={classes.MainBtn}>
            <Button variant="contained" onClick={DemoHandler}>
              Try Demo
            </Button>
            <Button variant="contained" onClick={() => setForm(true)} endIcon={<ArrowDownwardIcon />}>
              Fill the Form
            </Button>
          </div>
        </div>
      </Slide>

      {addMore ? (
        <Slide in={form} direction="up" unmountOnExit timeout={{ enter: 500, exit: 5000 }}>
          <div style={{ position: "absolute", maxWidth: "350px" }}>
            <Question Qno={Qno} onSubmit={onSubmit} />
          </div>
        </Slide>
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
