import { Avatar, makeStyles, Paper, Typography } from "@material-ui/core";
import { TitleText18, TitleText16L, TitleText16D } from "../HelperFiles/Custom";
import clap from "../Assets/clap.gif";
const useStyle = makeStyles((theme) => ({
  root: {
    borderRadius: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "#DBF4FF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
const AboutUs = ({ data }) => {
  const classes = useStyle();
  return (
    <Paper className={classes.root} elevation={0}>
      <Avatar className={classes.Avatar} src={clap} />
      <Typography style={{ fontWeight: 500, fontSize: "21px", textAlign: "center" }}>Welcome , To the Quiz</Typography>
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
