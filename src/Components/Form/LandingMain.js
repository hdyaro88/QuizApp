import { Button, Slide, Typography, makeStyles, Paper } from "@material-ui/core";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const useStyle = makeStyles({
  landing: {
    margin: "auto",
    position: "absolute",
    top: "10px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    overflow: "hidden",
  },
  text_box: {
    padding: "0.5rem",
    textAlign: "center",
    "& h6": {
      fontSize: "18px",
      lineHeight: "21.6px",
      marginBottom: "0.2rem",
      letterSpacing: "0.05rem",
      textAlign: "left",
      fontWeight: 500,
      color: "#ffffff",
      "&:before": {
        content: '"--> "',
        color: "#000000",
        fontWeight: "500",
      },
    },
  },
  top_border: {
    height: "20px",
    width: "100%",
    position: "relative",
    margin: "0.5rem 0",
    "&:before": {
      position: "absolute",
      content: '""',
      width: "100%",
      height: "20px",
      background: "linear-gradient(to left, #2c3e50 90% , #bdc3c7 10%)",
      transform: "skew(-65deg)",
      transformOrigin: "100% 100%",
    },
  },
  bottom_border: {
    height: "20px",
    width: "100%",
    margin: "0.5rem 0",
    position: "relative",
    "&:before": {
      position: "absolute",
      content: '""',
      width: "100%",
      height: "20px",
      backgroundColor: "#424242",
      background: "linear-gradient(to right, #2c3e50 90% , #bdc3c7 10%)",
      transform: "skew(-65deg)",
      transformOrigin: "100% 22%",
    },
  },
});
const LandingMain = ({ form, setForm, DemoHandler }) => {
  const classes = useStyle();
  return (
    <div className={classes.landing}>
      <Slide in={!form} direction="left" timeout={{ enter: 1000 }}>
        <div className={classes.top_border} />
      </Slide>
      <div className={classes.text_box}>
        <Typography
          style={{
            fontSize: "25px",
            lineHeight: "28.6px",
            textAlign: "center",
            fontWeight: 500,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          Welcome
        </Typography>
        <Typography variant="subtitle2">Create your own quiz.</Typography>
        <Typography variant="subtitle2"> With 5 different types of questions.</Typography>
        <Typography variant="subtitle2">Share link with your friends.</Typography>
        <Typography variant="subtitle2">Collect all responses at one place.</Typography>
      </div>
      <Slide in={!form} direction="right" timeout={{ enter: 1000 }}>
        <div className={classes.bottom_border} />
      </Slide>
    </div>
  );
};
export default LandingMain;
