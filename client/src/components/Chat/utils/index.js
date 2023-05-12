import { doc, getDocFromServer, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const chatFunction = async (userFirebase) => {
  try {
    const docRef = doc(db, "userConversations", userFirebase?.uid);
    const docSnap = await getDocFromServer(docRef);
    userFirebase?.uid &&
      !docSnap.exists() &&
      (await setDoc(doc(db, "userConversations", userFirebase?.uid), {}));
  } catch (err) {
    console.log(err);
  }
};
