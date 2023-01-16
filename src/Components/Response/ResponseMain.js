import { Avatar, Button, Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Form/Loading";
import { ArrowRightAlt } from "@material-ui/icons";
import { MCQOption, Option } from "../OptionTypes/MCQ";
import Options from "../Options";
import { DropdownOption } from "../OptionTypes/Dropdown";
import { StarOutlined as Star } from "@material-ui/icons";
import pdfFallback from "../Assets/pdf.png";
import FetchResponse from "./FetchResponse";
import { useHistory, useLocation } from "react-router";
const useStyle = makeStyles({
  questionMobile: {
    border: "1px solid #1C4E80",
    padding: "1rem 0",
    width: "80%",
    maxWidth: "500px",
    margin: "1rem auto",
    backgroundColor: "#ffffff",
    color: "#ffffff",
    borderRadius: "20px",
    backgroundColor: "#f50057",
  },
  response: {
    margin: "1rem",
    padding: "1rem",
    position: "relative",
  },
  btn_root: {
    position: "absolute",
    right: "20px",
    bottom: "20px",
    zIndex: "30",
    display: "flex",
    flexDirection: "column",
    "& button": {
      backgroundColor: "#f50057",
      color: "#ffffff",
      margin: "0.5rem 0",
    },
  },
  Avatar: {
    width: "150px",
    height: "100px",
  },
});
const SingleResponse = ({ data }) => {
  const classes = useStyle();
  const index = ["1", "2", "3", "4", "5"];
  return (
    <>
      <Paper elevation={0} className={classes.response}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "100px",
            margin: "0 0.5rem",
            alignSelf: "baseline",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        >
          <Typography style={{ fontWeight: 500 }}>{data.id}. </Typography>
          <ArrowRightAlt fontSize="medium" />
        </div>
        <div className={classes.questionMobile}>
          <Typography style={{ fontSize: "21px", textAlign: "center", alignSelf: "baseline" }}>
            {data.question}
          </Typography>
        </div>
        <div style={{ maxWidth: "350px", margin: "auto", display: "flex", justifyContent: "center" }}>
          {data?.type === "0" && (
            <MCQOption selected={data.response} value={data.response} No={String.fromCharCode(data?.optionNo + 65)} />
          )}
          {data?.type === "1" && <DropdownOption value={data.response} isSelected />}
          {data?.type === "2" && (
            <Typography style={{ fontSize: "24px", fontWeight: 600, color: "#000000" }} align="center">
              {data?.response}
            </Typography>
          )}
          {data?.type === "3" && (
            <Avatar
              variant="rounded"
              className={classes.Avatar}
              src={data.response.type.includes("pdf") ? pdfFallback : data.response.url}
              component={"a"}
              href={data.response.url}
              target="_blank"
            />
          )}
          {data?.type === "4" &&
            index.map((index) => {
              return (
                <Star
                  style={{
                    width: "50px",
                    height: "50px",
                    color: +index <= +data.response ? "#F50057" : "#C4C4C4cc",
                    cursor: "pointer",
                  }}
                />
              );
            })}
        </div>
      </Paper>
      <Divider />
    </>
  );
};
const ResponseMain = () => {
  const [loading, setLoading] = useState(true);
  const res = useSelector((state) => state.responses);
  const classes = useStyle();
  const url = useLocation().search;
  const params = new URLSearchParams(url);
  const [responses, setResponses] = useState([...res]);
  const form = useSelector((state) => state.formFilled);
  const demo = useSelector((state) => state.isDemo);
  console.log(form);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(responses);
  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(loadTimeout);
    };
  }, []);
  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
      <div className={classes.btn_root}>
        <Button
          variant="contained"
          onClick={() => {
            history.replace(form ? "/quizadmin" : demo ? "/demo" : `quiz?id=${params.get("id")}`);
          }}
        >
          Restart the quiz
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            dispatch({ type: "reset" });
            history.replace("/");
          }}
        >
          Create a new quiz
        </Button>
      </div>
      <div style={{ width: "100%", height: "100%", overflow: "scroll" }}>
        {loading ? (
          <Loading message="Your responses are being loaded. Please wait..." />
        ) : (
          <Paper elevation={0} style={{ marginTop: "1rem" }}>
            <Typography style={{ textAlign: "center", fontSize: "21px", margin: "1rem 0" }}>
              Your responses are shown below.
            </Typography>
            {responses.length === 0 ? (
              <FetchResponse setLoading={setLoading} setResponses={setResponses} />
            ) : (
              responses?.map((qdata, i) => {
                return <SingleResponse data={qdata} key={i} />;
              })
            )}
          </Paper>
        )}
      </div>
    </div>
  );
};
export default ResponseMain;
