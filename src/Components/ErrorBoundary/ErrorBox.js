import { Slide } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
const WithErrorHoc = (WrappedComp) => {
  const WithHocComponent = (props) => {
    const [error, setError] = useState("no error");
    return (
      <>
        {error !== "no error" && (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "100",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0 , 0 , 0 , 0.85)",
            }}
          >
            <Slide in={error !== "no error"}>
              <Alert onClose={() => setError("no error")} severity="warning">
                {error || "This is a warning alert — check it out!"}
              </Alert>
            </Slide>
          </div>
        )}
        <WrappedComp {...props} error={error} setError={setError} />
      </>
    );
  };
  return WithHocComponent;
};
export default WithErrorHoc;
