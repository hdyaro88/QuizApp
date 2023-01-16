import { createStore } from "redux";
import { db } from "../Components/HelperFiles/firebase";
let initial = true;
const defaultState = {
  isDemo: false,
  isReallyLoggedIn: true,
  data: [],
  formFilled: false,
  link: "",
  quizDetails: { quizId: "123", userId: "harshit" },
  responses: [],
};
const localContext = localStorage.getItem("context-data");
// console.log(localContext);
const initialState = localContext ? JSON.parse(localContext) : defaultState;

const Reducer = (state = initialState, action) => {
  if (action.type === "demo_control") {
    console.log("Start");
    return { ...state, isDemo: action.payload };
  }
  if (action.type === "reset") {
    // localStorage.removeItem("context-data");
    localStorage.removeItem("context-data");
    return { ...defaultState };
  }
  if (action.type === "retake") {
    return { ...state, responses: [] };
  }
  if (action.type === "LogIn") {
    return {
      ...state,
      isReallyLoggedIn: true,
    };
  }
  if (action.type === "data") {
    // console.log(state.data, action.payload);
    return { ...state, data: [...state.data, action.payload] };
  }
  if (action.type === "saveResponse") {
    // console.log(state.data, action.payload);
    return { ...state, responses: action.payload };
  }
  if (action.type === "Filled") {
    const link = `https://quiz-react-app20.herokuapp.com/quiz?id=${action.payload}`;
    return { ...state, formFilled: true, link: link, quizDetails: { ...state.quizDetails, quizId: action.payload } };
  }
  if (action.type === "quizDetails") {
    return { ...state, quizDetails: { quizId: action.payload.quizId, userId: action.payload.userId } };
  }
  return state;
};

const store = createStore(Reducer);
export default store;
