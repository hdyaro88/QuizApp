import { Avatar, makeStyles, Paper, Typography, Link, Button } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { TitleText18, TitleText16L, TitleText16D } from "../HelperFiles/Custom";
import clap from "../Assets/clap.gif";
import { useState } from "react";
const useStyle = makeStyles((theme) => ({
  root: {
    borderRadius: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "#DBF4FF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& button": {
      color: "#1976d2",
      fontWeight: 500,
      fontSize: "18px",
    },
  },
  Avatar: {
    width: "100px",
    height: "100px",
    margin: "1rem auto",
  },
  mobile: {
    width: "100%",
    height: "100%",
    backgroundColor: "#DBF4FF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0 0 20px 20px",
  },
}));
const AboutUs = ({ data, link }) => {
  const classes = useStyle();
  const [copied, setCopied] = useState(false);
  const copyHandler = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };
  const shareHandler = () => {
    const shareData = {
      title : "Quiz" ,
      url : `https://${link}`
    }
    navigator.share(shareData);
  }
  return (
    <Paper className={classes.root} elevation={0}>
      <Snackbar open={copied} autoHideDuration={1000} message="Link Copied" onClose={() => setCopied(false)} />

      <Avatar className={classes.Avatar} src={clap} />
      <Typography style={{ fontWeight: 500, fontSize: "21px", textAlign: "center" }}>Welcome , To the Quiz</Typography>
      {link && (
        <div style={{ margin: "auto" }}>
          <Button variant="text" onClick={copyHandler}>
            Copy the Link
          </Button>
          <Button variant="text" onClick={shareHandler}>
            Share with others
          </Button>
        </div>
      )}
    </Paper>
  );
};
export const AboutUsMobile = ({ data }) => {
  const classes = useStyle();
  return (
    <Paper elevation={0} className={classes.mobile}>
      <Avatar className={classes.Avatar} style={{ margin: "1rem" }} src={clap} />
      <TitleText18 style={{ fontSize: "30px" }}>{data?.username}</TitleText18>
    </Paper>
  );
};
export default AboutUs;
