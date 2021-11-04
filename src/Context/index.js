import { createStore } from "redux";
import { db } from "../Components/HelperFiles/firebase";
const initialState = { isDemo: false, isReallyLoggedIn: true, data: [], formFilled: false , link : "" };

const Reducer = (state = initialState, action) => {
  if (action.type === "demoStart") {
    console.log("Start");
    return { ...state, isDemo: true };
  }
  if (action.type === "LogIn") {
    return {
      ...state,
      isReallyLoggedIn: true,
    };
  }
  if (action.type === "data") {
    console.log(state.data, action.payload);
    return { ...state, data: [...state.data, action.payload] };
  }
  if (action.type === "Filled") {
    const link = `https://hdyaro88.github.io/QuizApp/quiz?id=${action.payload}`;
    return { ...state, formFilled: true , link : link };
  }
  return state;
};

const store = createStore(Reducer);
export default store;
