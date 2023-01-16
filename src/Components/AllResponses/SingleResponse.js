import { TableCell, TableRow, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
const SingleResponse = ({ data }) => {
  const name = Object.keys(data)[0];
  const quizId = useSelector((state) => state.quizDetails.quizId);
  const url = useLocation().search;
  const history = useHistory();
  const dispatch = useDispatch();
  const ShowResponseHandler = () => {
    dispatch({ type: "quizDetails", payload: { quizId: quizId, userId: name } });
    dispatch({ type: "saveResponse", payload: data[name]?.responses });
    // history.push("/responses");
  };
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>
        <NavLink to="/responses" onClick={ShowResponseHandler}>
          Show Response
        </NavLink>
      </TableCell>
      <TableCell>{data[name]?.timestamp}</TableCell>
    </TableRow>
  );
};
export default SingleResponse;
