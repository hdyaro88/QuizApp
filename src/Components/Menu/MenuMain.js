import { Button, ClickAwayListener, makeStyles } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";

const useStyle = makeStyles({
  btn_root: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#f50057",
    color: "#ffffff",
  },
  menu: {
    backgroundColor: "rgba(0 , 0 , 0 , 0.5)",
    color: "#ffffff",
    "& button": {
      color: "#ffffff",
    },
  },
  menu_inner: {
    color: "#ffffff",
    "& li": {
      textAlign: "center",
      margin: "auto",
    },
  },
  menu_btn: {
    color: "#ffffff",
    backgroundColor: "#f50057",
    margin: "0.5rem 0",
  },
});
const MenuMain = ({ onRetake }) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const history = useHistory();
  const url = useLocation();
  const dispatch = useDispatch();
  console.log(url.pathname);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      style={{
        backgroundColor: "transparent",
        position: "fixed",
        top: "30px",
        right: "30px",
        zIndex: "40",
        overflow: "hidden",
        borderRadius: "50%",
      }}
      className={open ? "menu-open" : "menu-close"}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <div className={classes.menu_inner}>
          <Menu
            style={{
              position: "absolute",
              cursor: "pointer",
              right: "10px",
              top: "10px",
              zIndex: "40",
              width: "20px",
              height: "20px",
              padding: "0.5rem",
            }}
            className={classes.btn_root}
            onClick={() => setOpen(!open)}
          />
          <div
            style={{
              position: "absolute",
              top: "50px",
              width: "200px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button
              onClick={() => {
                handleClose();
                onRetake();
              }}
              className={classes.menu_btn}
              disableElevation
              variant="contained"
            >
              Retake Quiz
            </Button>
            <Button
              onClick={() => {
                handleClose();
                dispatch({ type: "reset" });
                history.replace("/");
              }}
              className={classes.menu_btn}
              disableElevation
              variant="contained"
            >
              Start a new Quiz
            </Button>
            {url?.pathname.includes("quizadmin") && (
              <Button
                onClick={() => {
                  handleClose();
                  history.push("/fetch-responses");
                }}
                className={classes.menu_btn}
                disableElevation
                variant="contained"
              >
                Check All Responses
              </Button>
            )}
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};
export default MenuMain;
