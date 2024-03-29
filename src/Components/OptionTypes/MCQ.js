import { makeStyles, Typography, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Check } from "@material-ui/icons";
import { ArrowRightAlt } from "@material-ui/icons";
const useStyle = makeStyles((theme) => ({
  Option: {
    margin: "1rem 0",
    position: "relative",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    border: "1px solid #C4C4CC",
    // filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#1C4E80",
    width: "100%",
    maxWidth: "350px",
    minWidth: "75px",
    minHeight: "50px",
    padding: "0px",
    transitionTimingFunction: "ease-out",
    transition: "all 200ms",
    cursor: "pointer",
    opacity: 1,
    "&:hover": {
      transform: "scale(1.01)",
    },
  },
  OptionNo: {
    position: "relative",
    width: "24px",
    border: "1px solid #ffffffcc",
    margin: "0 1rem",
    minWidth: "22px",
    height: "24px",
    borderRadius: "2px",
    fontSize: "12px",
    lineHeight: "16px",
    backgroundColor: "rgba(94, 193, 171, 0.8)",
    color: "rgb(255, 255, 255)",
  },
  selected: {
    backgroundColor: "#ffffff!important",
    color: "rgba(94, 193, 171, 0.8)!important",
    border: "1px solid #c4c4c4",
  },
  menu: {
    width: "inherit",
  },
  submit: {
    backgroundColor: "#F50057",
    color: "#ffffff",
  },
  optionBox: {
    width: "100%",
    padding: "0 0.5rem",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));
const OptionNo = ({ No, selected }) => {
  const classes = useStyle();
  return (
    <div key={No} className={`${classes.OptionNo} ${selected ? classes.selected : ""}`}>
      <Typography style={{ fontWeight: 500, textAlign: "center" }}>{No}</Typography>
    </div>
  );
};
export const MCQOption = ({ value, onClick, No, select, selected }) => {
  const classes = useStyle();
  const [isSelected, setisSelected] = useState(false);
  const ClickHandler = () => {
    if (isSelected) {
      return;
    }
    select(value);
    setTimeout(() => {
      onClick();
    }, 500);
  };
  useEffect(() => {
    setisSelected(selected === value ? true : false);
  }, [select]);
  return (
    <div
      key={No}
      className={`${classes.Option} ${selected === value ? "selected" : ""}`}
      onClick={() => ClickHandler()}
    >
      <OptionNo selected={selected === value} No={No} />
      <Typography style={{ fontWeight: 500, fontSize: "18px" }}>{value}</Typography>
      {selected === value && <Check style={{ position: "absolute", right: "5px", top: "20%" }} />}
    </div>
  );
};

const MCQ = ({ select, selected, onClick, Options }) => {
  const classes = useStyle();
  let charCode = 65;
  return (
    <>
      <div className={classes.optionBox} style={{ height: "280px" }}>
        {Options.map((option) => {
          return (
            <MCQOption
              No={String.fromCharCode(charCode++)}
              select={select}
              selected={selected}
              onClick={onClick}
              value={option}
            />
          );
        })}
      </div>
      <Button classes={{ root: classes.submit }} variant="contained" endIcon={<ArrowRightAlt />} onClick={onClick}>
        OK
      </Button>
    </>
  );
};
export default MCQ;
