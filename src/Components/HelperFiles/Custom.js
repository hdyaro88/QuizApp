import { Button, Typography, withStyles, makeStyles } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import { ArrowLeft } from "@material-ui/icons";
import { Slide } from "@material-ui/core";
export const TitleHead = withStyles({
  root: {
    fontSize: "24px",
    lineHeight: "28.8px",
    color: "#575757",
    marginBottom: "0.4rem",
  },
})(Typography);

export const TitleText18 = withStyles({
  root: {
    fontSize: "18px",
    lineHeight: "21.6px",
    margin: "0.2rem 0",
    fontWeight: 500,
  },
})(Typography);

export const TitleText16L = withStyles({
  root: {
    fontSize: "16px",
    lineHeight: "19.2px",
    fontWeight: "400",
    color: "#777777",
    margin: "0.2rem 0",
  },
})(Typography);

export const TitleText16D = withStyles({
  root: {
    fontSize: "16px",
    lineHeight: "19.2px",
    fontWeight: "500",
    color: (props) => props.color || "#000000",
    margin: "0.2rem 0",
  },
})(Typography);

export const TitleText14 = withStyles({
  root: {
    // display : "flex",
    // alignItems : "center",
    fontSize: "14px",
    lineHeight: "16.8px",
    color: (props) => props.color || "#A1A1A1",
    fontWeight: "400",
  },
})(Typography);

export const TitleText24 = withStyles({
  root: {
    fontSize: "24px",
    lineHeight: "28.8px",
    color: "#000000",
    fontWeight: "500",
  },
})(Typography);

export const TitleText12 = withStyles({
  root: {
    fontSize: "12px",
    lineHeight: "14.4px",
    color: "#000000",
    fontWeight: "500",
  },
})(Typography);

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "0.2rem 0.5rem",
    minWidth: "25px",
    backgroundColor : "#E1E1E1",
    color : "#000000"
  },
}));
export const Switch = ({ setCurrQues, setDir, Qno, total }) => {
  const classes = useStyle();
  const handleClick = (sign, dir) => {
    if (+Qno >= 1 && +Qno <= total.toString())
      if (sign === "+") setCurrQues((prev) => (+prev + 1).toString());
      else {
        setCurrQues((prev) => (+prev - 1).toString());
      }
    setDir(dir);
  };
  return (
    <Slide direction="up" in={Qno >= 1 && Qno <= total.toString()} unmountOnExit mountOnEnter>
      <div style={{ display: "flex", justifyContent: "center", position: "absolute", bottom: "10px", margin: "auto" }}>
        <Button
          variant="contained"
          style={{ borderRadius: "5px 0 0 5px" }}
          classes={{ root: classes.root }}
          onClick={() => handleClick("-", "right")}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="contained"
          style={{ borderRadius: "0 5px 5px 0" }}
          classes={{ root: classes.root }}
          onClick={() => handleClick("+", "left")}
        >
          <ArrowRight />
        </Button>
      </div>
    </Slide>
  );
};
