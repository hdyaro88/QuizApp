import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import { width } from "@mui/system";
import { useEffect, useState } from "react";
import { FileUploadHandler } from "../ApiHandlers/Handlers";
import pdfFallback from "../Assets/pdf.png";
const useStyle = makeStyles({
  btn_root: {
    margin: "0.5rem auto",
    alignSelf: "center",
    backgroundColor: "#F50057",
    color: "#ffffff",
    padding: "0 auto",
  },
  avatar: {
    width: "150px",
    height: "100px",
    margin: "auto",
  },
  main: {
    margin: "1rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "space-around",
    maxWidth: "320px",
    "@media screen and (max-width: 600px)": {
      height: "300px",
    },
  },
});
const FileUpload = ({ selected, select, onClick }) => {
  const classes = useStyle();
  const [File, setFile] = useState({ file: null, name: "", type: "" });
  const FileSelectHandler = (event) => {
    // console.log(event);
    const file = event.target.files[0];
    setFile({ file: file, name: file.name, type: file.type });
  };
  useEffect(() => {
    if (!File.file) {
      return;
    }
    const file = URL.createObjectURL(File?.file);
    // console.log({ file: File.file });
    select(File?.file);
  }, [File]);
  return (
    <>
      <Button size="small" className={classes.btn_root} variant="contained" component="label" htmlFor="upload">
        <h2 style={{ margin: "0", padding: "0 0.5rem 0 0" }}>+</h2>Upload File
        <input
          type="file"
          accept="application/pdf , image/x-png,image/gif,image/jpeg"
          hidden
          id="upload"
          multiple
          onChange={FileSelectHandler}
        />
      </Button>
      {File.file != null && (
        <div className={classes.main}>
          <Avatar
            className={classes.avatar}
            variant="rounded"
            src={File.type.includes("image") ? URL.createObjectURL(File.file) : pdfFallback}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "1rem",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <Typography
              style={{
                color: "#000000",
                fontWeight: "500",
                textAlign: "center",
                textOverflow: "ellipsis",
                width: "inherit",
                overflow: "hidden",
              }}
            >
              {File.name}
            </Typography>
          </div>
        </div>
      )}
      <Button
        className={classes.btn_root}
        style={{ backgroundColor: "#000000", color: "#ffffff" }}
        variant="contained"
        onClick={() => onClick()}
      >
        Next
      </Button>
    </>
  );
};
export default FileUpload;
