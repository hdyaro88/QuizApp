import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AbstractQuiz from "./AbstractQuiz";
import UserInfo from "./UserInfo";

const Main = () => {
  const [isUser, setIsUser] = useState(false);
  const dispatch = useDispatch();
  // console.log(isUser, "isUser");
  useEffect(() => {
    dispatch({ type: "reset" });
    localStorage.removeItem("context-data");
  }, []);
  return (
    <>
      {isUser && <AbstractQuiz />}
      {!isUser && <UserInfo isUser={isUser} userLogin={setIsUser} />}
    </>
  );
};
export default Main;
