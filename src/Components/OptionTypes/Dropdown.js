import { makeStyles, TextField, Typography, Collapse, IconButton, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ArrowDropDown, Check } from "@material-ui/icons";
import { ArrowRightAlt } from "@material-ui/icons";
import Dimentions from "../HelperFiles/Dimentions";
const useStyle = makeStyles((theme) => ({
  Option: {
    margin: "1rem 10px",
    position: "relative",
    boxShadow: "#C4C4C4 0px 0px 0px 1px inset",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#1C4E80",
    maxWidth: "100%",
    minWidth: "75px",
    minHeight: "40px",
    padding: "0px",
    transitionTimingFunction: "ease-out",
    transition: "all 200ms",
    cursor: "pointer",
    opacity: 1,
    "&:hover": {
      transform: "scale(1.01)",
    },
  },
  checkBox: {
    position: "relative",
    width: "20px",
    margin: "0 1rem",
    minWidth: "22px",
    height: "20px",
    borderRadius: "2px",
    fontSize: "12px",
    lineHeight: "16px",
    backgroundColor: "#ffffff!important",
    color: "rgba(94, 193, 171, 0.8)!important",
    border: "1px solid #c4c4c4",
  },
  TextField: {
    fontSize: "24px",
    width: "100%",
    "& input": {
      fontSize: "18px",
      lineHeight : "21.6px",
      padding: "0 1rem",
    },
  },
  optionBox: {
    margin: "1rem 0",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  submit: {
    backgroundColor: "#F50057",
    color: "#ffffff",
    margin: "1rem 0",
  },
}));
const Option = ({ isSelected, onClick, value }) => {
  const classes = useStyle();
  const ClickHandler = () => {
    onClick(value);
  };
  return (
    <div key={value} className={classes.Option} onClick={() => ClickHandler()}>
      <div className={classes.checkBox}>{isSelected && <Check />}</div>
      <Typography style={{ fontWeight: 500, fontSize: "18px" }}>{value}</Typography>
    </div>
  );
};
const DropDown = ({ select, selected, onClick, Options }) => {
  const [menu, setMenu] = useState(false);
  const [value, setValue] = useState(selected);
  const classes = useStyle();
  const { width } = Dimentions();
  const ClickHandler = (value) => {
    select(value);
    setValue(value);
    setMenu(false);
    setTimeout(() => {
      onClick();
    }, 500);
  };
  useEffect(() => {
    return select(value);
  }, [value]);
  return (
    <div style={{ position: "relative", width: "100%", margin: "1rem 0", color: "#000000" }}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={classes.TextField}
        InputProps={{
          endAdornment: (
            <IconButton>
              <ArrowDropDown onClick={() => setMenu(!menu)} />
            </IconButton>
          ),
          placeholder: "Type or Select from the list",
        }}
      />
      <Collapse in={menu} unmountOnExit mountOnEnter>
        <div className={classes.optionBox} style={{ height: width < 600 ? "250px" : "200px" }}>
          {Options.map((option, i) => {
            return (
              <>
                <Option isSelected={selected === option} key={i} onClick={ClickHandler} value={option} />
              </>
            );
          })}
        </div>
      </Collapse>
      <Button classes={{ root: classes.submit }} variant="contained" endIcon={<ArrowRightAlt />} onClick={onClick}>
        OK
      </Button>
    </div>
  );
};
export default DropDown;
