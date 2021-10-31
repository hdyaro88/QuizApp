import { CircularProgress, Typography } from "@material-ui/core";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "rgba(0 , 0 , 0 , 0.85)",
        alignItems: "center",
        flexWrap: "wrap",
        alignContent: "center",
      }}
    >
      <Typography
        style={{
          color: "#ffffff",
          fontSize: "18px",
          fontWeight: 500,
          textAlign: "center",
          width: "80%",
          margin: "1rem 0",
        }}
      >
        Please wait while we prepare the quiz for you !
      </Typography>
      <CircularProgress style={{ width: "50px", height: "50px", margin: "0 1rem", color: "#ffffff" }} />
    </div>
  );
};
export default Loading;
