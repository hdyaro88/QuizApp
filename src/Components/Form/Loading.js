import { CircularProgress, Typography } from "@material-ui/core";

export const Loading = ({ message }) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 30,
        top: 0,
        left: 0,
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
        {message}
      </Typography>
      <CircularProgress style={{ width: "50px", height: "50px", margin: "0 1rem", color: "#ffffff" }} />
    </div>
  );
};
export default Loading;
