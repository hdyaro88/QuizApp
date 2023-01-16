import { Avatar, Button, Card, LinearProgress, makeStyles, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loading from "../Form/Loading";
import fallback from "../../Assets/404Fallback.jpg";
const useStyle = makeStyles({
  box: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    maxWidth: "350px",
    maxHeight: "500px",
    backgroundColor: "#949398FF",
    boxShadow: "0 0 10px 100px rbga(200 , 300 , 200 , 0.5)",
  },
  btn_root: {
    backgroundColor: "#F50057",
    color: "#ffffff",
  },
  error404: {
    width: "80%",
    padding: "0.5rem",
    backgroundColor: "#F50057",
    color: "#ffffff",
  },
  image: {
    width: "250px",
    height: "250px",
  },
});
const Main404 = () => {
  const classes = useStyle();
  const [image, setImage] = useState(fallback);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const timer = useRef(null);
  // console.log(progress);
  useEffect(() => {
    localStorage.removeItem("context-data");
    const timeout1 = setInterval(() => {
      axios.get("https://dog.ceo/api/breeds/image/random").then((res) => {
        setImage(res.data.message);
        setProgress(100);
      });
    }, 8000);

    return () => {
      clearInterval(timeout1);
    };
  }, []);
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setProgress((prev) => prev + 10);
    }, 1000);
    if (progress >= 100) {
      setProgress(0);
      clearTimeout(timeout2);
    }
    return () => {
      clearTimeout(timeout2);
    };
  }, [progress]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#949398FF",
      }}
    >
      <Paper elevation={0} className={classes.box}>
        <Card className={classes.error404} elevation={0}>
          <Typography style={{ fontSize: "21px", textAlign: "center", fontWeight: "600" }}>Oooooops...</Typography>
          <Typography style={{ fontSize: "18px", textAlign: "center", fontWeight: "500" }}>
            It seems like you just broke the internet !!
          </Typography>
          <Typography style={{ fontSize: "28px", fontWeight: "500", textAlign: "center" }}>404</Typography>
        </Card>
        {Loading && (
          <LinearProgress value={progress} color="secondary" style={{ width: "100%" }} variant="determinate" />
        )}
        <Avatar variant="rounded" className={classes.image} src={image} />
        <Button
          disableElevation
          variant="contained"
          className={classes.btn_root}
          onClick={() => {
            dispatch({ type: "reset" });
            history.replace("/");
          }}
        >
          Take me to the Homepage
        </Button>
      </Paper>
    </div>
  );
};
export default Main404;
