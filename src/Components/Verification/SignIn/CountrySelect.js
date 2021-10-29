import VerifyMain from "../VerifyMain";
import signin from "../../Assets/signIn.png";
import {
  TextField,
  Button,
  makeStyles,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Collapse,
  ClickAwayListener,
  Menu,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { ArrowDropDown } from "@material-ui/icons";
import { countries } from "./CountryJson";
const useStyle = makeStyles((theme) => ({
  countryBox: {},
  TextField: {
    margin: "0.5rem 0",
    borderRadius: "10px",
    color: "#000000",
    maxWidth : "100px",
    padding: "0 0 0 1rem",
  },
  TextField_input : {
    borderRadius: "10px",
    maxWidth : "150px",
  },
  disabled : {
      color : "#000000"
  }
}));
const CountrySelect = ({ country }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [code, setCode] = useState("+91");
  const classes = useStyle();
  const [menu, setMenu] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChange = (code) => {
    country(code);
    setCode(code);
    setAnchorEl(null);
  };
  return (
    <div>
      {/* <Typography style={{fontWeight : "600" , fontSize : "18px"}}>{code}</Typography> */}
      <TextField
        value={code}
        disabled
        variant="outlined"
        InputProps={{
          endAdornment: (
            <IconButton style={{ padding: "0" }} disableFocusRipple>
              <ArrowDropDown onClick={handleClick} />
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                className={classes.countryBox}
              >
                {countries.map((item, i) => (
                  <MenuItem key={i} onClick={() => handleChange(item.code)}>
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            </IconButton>
          ),
          classes: { root: classes.TextField_input , disabled : classes.disabled },
        }}
      />
    </div>
  );
};
export default CountrySelect;
