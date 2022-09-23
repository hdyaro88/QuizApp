import { useEffect, useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Main from "./Components/Main/Main";
import Test from "./Components/Test";
import VerifyMain from "./Components/Verification/VerifyMain";
import FormMain from "./Components/Form/FormMain";
import { data } from "./Components/SampleData";
function App() {
  const dispatch = useDispatch();
  const demo = useSelector((state) => state.isDemo);
  const login = useSelector((state) => state.isReallyLoggedIn);
  const formFilled = useSelector((state) => state.formFilled);
<<<<<<< HEAD
  const quizData = useSelector(state => state.data)
=======
  const quizData = useSelector((state) => state.data);
  // hello
>>>>>>> ff93df9 (changes from new)
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
      {(!demo && !formFilled) && <FormMain/>}
      {demo && <Main isReallyLoggedIn={demo} data={data}/>}
      {formFilled && <Main isReallyLoggedIn={login} data={quizData}/>}
  
    </div>
  );
}

export default App;
