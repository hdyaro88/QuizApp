import { makeStyles } from "@material-ui/core";
import { StarOutlined as Star } from "@material-ui/icons";
import { useState, useEffect } from "react";
const useStyle = makeStyles((theme) => ({
  selected: {
    backgroundColor: "#F50057",
  },
}));
const Rating = ({ select, selected, onClick }) => {
  const [value, setValue] = useState(selected || "0");
  const [isClicked, setIsclicked] = useState(false);
  const index = ["1", "2", "3", "4", "5"];
  const classes = useStyle();
  const handleClick = (index) => {
    setIsclicked(true);
    setValue(index);
    select(index);
    onClick();
  };
  // useEffect(() => {
  //   setValue(selected);
  // }, [selected]);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "2rem 0" }}>
      {index.map((index) => {
        return (
          <Star
            onClick={() => handleClick(index)}
            onMouseEnter={() => setValue(index)}
            onMouseLeave={() => {
              if (!isClicked) {
                setValue("0");
              }
            }}
            style={{
              width: "50px",
              height: "50px",
              color: +index <= +value ? "#F50057" : "#C4C4C4cc",
              cursor: "pointer",
            }}
          />
        );
      })}
    </div>
  );
};
export default Rating;
