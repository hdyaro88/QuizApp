import { Button, CircularProgress, Icon, makeStyles, Slide, TextField, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import { useStyle } from "./FormMain";
const Question = ({ onSubmit, setQuestionAdded, Qno }) => {
  const classes = useStyle();
  const [addOption, setAddOption] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState("");
  const [question, setQuestion] = useState("");
  const [data, setData] = useState({
    id: Qno.toString(),
    question: "",
    type: "0",
    options: [],
  });
  const optionNo = data?.options.length;
  const AddOptionHandler = () => {
    if (option.trim().length === 0) {
      return;
    }
    setData((prev) => {
      return { ...prev, options: [...prev.options, option] };
    });
    setAddOption(false);
    setOption("");
  };
  const questionHandler = (e) => {
    setData((prev) => {
      return { ...prev, question: e.target.value };
    });
  };
  const submitHandler = () => {
    onSubmit(data);
  };
  useEffect(() => {
    if (!submitClicked) {
      return;
    }
    setLoading(true);
    onSubmit(data);
    return () => {
      setLoading(false);
    };
  }, [submitClicked]);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
        <Typography style={{ margin: "auto", fontWeight: 500 }} variant="body1">
          Please Specify the Question Type
        </Typography>
        <Dropdown data={data} setData={setData} Options={["MCQ", "Dropdown", "Slider"]} />
      </div>
      <div style={{ display: "flex", width: "100%", flexWrap: "wrap", margin: "1rem 0", color: "#000000" }}>
        <Typography style={{ margin: "auto", fontWeight: 500 }} variant="body1">
          Please Enter Your Question
        </Typography>
        <TextField
          value={data.question}
          InputProps={{ startAdornment: <h2>Q</h2>}}
          onChange={questionHandler}
          className={classes.TextField}
          placeholder="Enter Your Question"
        />
      </div>
      {(data?.type == '0' || data?.type == '1') && <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          margin: "1rem 0",
          color: "#000000",
          flexDirection: "column",
        }}
      >
        <Typography style={{ margin: "auto", fontWeight: 500 }} variant="body1">
          Please Enter Options
        </Typography>
        {data?.options.map((item, i) => {
          const index = data.options.indexOf(item);
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h7">{index + 1}.</Typography>
              <Typography className={classes.option} key={i}>
                {item}
              </Typography>
            </div>
          );
        })}
        {addOption && (
          <div style={{ display: "flex", justifyContent: "space-around", margin: "1rem 0", alignItems: "center" }}>
            <Typography variant="h6">{optionNo + 1}</Typography>
            <TextField value={option} onChange={(e) => setOption(e.target.value)} placeholder="Your Option" />
            <Button onClick={AddOptionHandler}>Add</Button>
          </div>
        )}
        <Button onClick={() => setAddOption(true)}>+ Add Option</Button>
      </div>}
      <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => setSubmitClicked(true)}
        >
          {loading && <CircularProgress color="inherit" style={{ width: "20px", height: "20px", margin: "0 1rem" }} />}{" "}
          Submit
        </Button>
      </div>
    </div>
  );
};
export default Question;
