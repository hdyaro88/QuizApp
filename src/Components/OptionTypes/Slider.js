import { Slider as Range, Button, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { ArrowRightAlt } from "@material-ui/icons";
const useStyle = makeStyles((theme) => ({
  submit: {
    backgroundColor: "#F50057",
    color: "#ffffff",
  },
  slider: {
    "& span": {
      minHeight: "5px",
    },
  },
  track: {
    backgroundColor: "#F50057cc",
  },
  rail: {
    backgroundColor: "#F50057",
  },
  thumb: {
    width: "15px",
    height: "15px",
    alignSelf: "center",
    backgroundColor: "#F50057",
  },
}));
const Slider = ({ select, selected, onClick }) => {
  const [value, setValue] = useState(selected || "50");
  const classes = useStyle();
  const handleChange = (e, newValue) => {
    setValue(newValue);
    // console.log(newValue)
    select(newValue);
    setTimeout(() => {
      onClick();
    }, 500);
  };
  const submit = () => {
    select(value);
      onClick();
  };
  return (
    <div>
      <Typography style={{ fontSize: "24px", fontWeight: 600, color: "#000000" }} align="center">
        {value}
      </Typography>
      <Range
        classes={{ root: classes.slider, track: classes.track, rail: classes.rail, thumb: classes.thumb }}
        onChangeCommitted={handleChange}
        defaultValue={50}
        value={value}
      />
      <Button
        classes={{ root: classes.submit }}
        variant="contained"
        endIcon={<ArrowRightAlt />}
        onClick={() => submit()}
      >
        OK
      </Button>
    </div>
  );
};

export default Slider;
