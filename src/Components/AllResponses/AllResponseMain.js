import { makeStyles, Paper, TextField, Typography, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchResponses } from "./Handlers";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import SingleResponse from "./SingleResponse";
import Loading from "../Form/Loading";
const columns = ["Name", "Link", "Date"];
const useStyle = makeStyles({
  TextField: {
    margin: "1rem auto",
  },
  btn_root: {
    backgroundColor: "#000000",
    color: "#ffffff",
  },
});
const AllResponseMain = ({ setError }) => {
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const classes = useStyle();
  const quizId = useSelector((state) => state.quizDetails.quizId);
  console.log(quizId);
  const fetchResponse = async () => {
    setLoading(true);
    try {
      const res = await FetchResponses(quizId, setResponses);
    } catch (err) {
      console.log(err, "Something went wrong!");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchResponse();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000000cc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns?.map((col, i) => {
                  return (
                    <TableCell style={{ backgroundColor: "#ebc634" }} align="center" key={i}>
                      {col}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <Loading message="Please Wait..." />
              ) : (
                responses?.map((res, i) => {
                  return <SingleResponse data={res} key={i} />;
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
export default AllResponseMain;
