import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../Form/Loading";
import { db } from "../HelperFiles/firebase";
import Main from "../Main/Main";
import UserInfo from "./UserInfo";

const AbstractQuiz = (props) => {
  const url = useLocation().search;
  const params = new URLSearchParams(url);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const docRef = db.collection("quizData").doc(params.get("id"));
    docRef
      .get()
      .then((doc) => {
        const data = doc.data();
        // console.log(data);
        setData([...data.questions]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading && <Loading message="Fetching the questions , Please wait..." />}
      <Main isReallyLoggedIn={true} data={data} />
    </>
  );
};
export default AbstractQuiz;
