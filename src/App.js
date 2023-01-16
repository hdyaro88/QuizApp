import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Main from "./Components/Main/Main";
import QuizAbstract from "./Components/Abstract/Main";
import FormMain from "./Components/Form/FormMain";
import { data } from "./Components/SampleData";
import { Switch, Route } from "react-router-dom";
import ResponseMain from "./Components/Response/ResponseMain";
import Main404 from "./Components/404/404";
import { useEffect } from "react";
import AllResponseMain from "./Components/AllResponses/AllResponseMain";
let initial = true;
function App({ error, setError }) {
  const dispatch = useDispatch();
  const demo = useSelector((state) => state.isDemo);
  const login = useSelector((state) => state.isReallyLoggedIn);
  const formFilled = useSelector((state) => state.formFilled);
  const quizData = useSelector((state) => state.data);
  const quizDetails = useSelector((state) => state.quizDetails);
  const context = useSelector((state) => state);
  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    localStorage.setItem("context-data", JSON.stringify(context));
  }, [context]);
  // console.log(demo, quizData);
  return (
    <div
      style={{
        width: "inherit",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Switch>
        <Route exact path="/">
          {initial ? (
            <FormMain setError={setError} />
          ) : !demo && !formFilled ? (
            <FormMain setError={setError} />
          ) : (
            <Main404 />
          )}
        </Route>
        <Route exact path="/demo">
          {demo ? <Main isReallyLoggedIn={demo} data={data} setError={setError} /> : <Main404 />}
        </Route>
        <Route exact path="/quizadmin">
          {/* {console.log("hello")} */}
          {formFilled ? <Main isReallyLoggedIn={login} data={quizData} setError={setError} /> : <Main404 />}
        </Route>
        <Route exact path="/quiz">
          <QuizAbstract />
        </Route>
        <Route path="/responses" exact>
          <ResponseMain />
        </Route>
        <Route path="/fetch-responses" exact>
          <AllResponseMain setError={setError} />
        </Route>
        <Route path="*">
          <Main404 />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
