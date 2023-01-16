import axios from "axios";
import { storage } from "../HelperFiles/firebase";
export const FileUploadHandler = async (userId, response) => {
  await Promise.all(
    response?.map(async (res) => {
      console.log(res.type);
      if (res.type !== "3") {
        return;
      }
      try {
        const storageRef = storage.ref(`Quiz/${userId}`);
        // const fileRef = storageRef.child("quiz");
        await storageRef.put(res.response);
        const FileURL = await storageRef.getDownloadURL();
        const FileMetaData = await storageRef.getMetadata();
        res.response = { url: FileURL, type: FileMetaData.contentType };
      } catch (err) {
        console.log("Something Went Wrong", err);
      }
    })
  );
};

export const saveResponses = async (quizId, userId, response, setLoading, dispatch) => {
  setLoading(true);
  await FileUploadHandler(userId, response);
  console.log(response);
  dispatch({ type: "saveResponse", payload: response });
  axios
    .post("/api/save-response", {
      quizId: quizId,
      userId: userId,
      response: response,
      timeStamp: new Date(Date.now()).toString(),
    })
    .then((res) => {
      console.log(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("something went wrong");
      setLoading(false);
    });
};
