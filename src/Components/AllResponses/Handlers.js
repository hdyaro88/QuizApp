import { db } from "../HelperFiles/firebase";

export const FetchResponses = async (quizId, setResponses) => {
  console.log(quizId);
  const larr = [];
  try {
    const docs = await db.collection("Responses").doc(quizId.toString()).collection("Users").get();
    if (docs) {
      docs.forEach((doc) => {
        const obj = {};
        const data = doc.data();
        obj[doc.id] = data;
        larr.push(obj);
      });
    } else {
      throw new Error("No Doc Found!!");
    }
  } catch (err) {
    console.log(err, "something went wrong!");
  }
  setResponses(larr); 
};
