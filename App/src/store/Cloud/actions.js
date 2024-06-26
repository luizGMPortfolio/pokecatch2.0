import { db } from "src/firebase/Configs";
import { doc, addDoc, updateDoc, Timestamp } from "firebase/firestore";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { SETDOCUMENT } from "./mutations";


const createDocuments = async (collections, data) => {
  const NewData = { ...data, createdAt: Timestamp.now() };
  try {
    const docRef = await addDoc(collection(db, collections), NewData);
  } catch (error) {
    console.log(error.message);
    console.log(typeof error.message);
  }
};
const UpdateDocuments = async (docCollection, uid, data) => {
  try {
    const docRef = doc(db, docCollection, uid);
    const updatedDocument = await updateDoc(docRef, data);
    return updatedDocument;
  } catch (error) {
    console.log(error);
    console.log(typeof error.message);
  }
};
const GetDocuments = async (docCollection, uid = null) => {

  const collectionRef = await collection(db, docCollection);
  try {
    let q;

    if (uid) {
      q = await query(
        collectionRef,
        where("uid", "==", uid),
        orderBy("createdAt", "desc")
      );
    } else {
      q = await query(collectionRef, orderBy("createdAt", "desc"));
    }

    await onSnapshot(q, (querySnapshot) => {
      const data = (
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      return data[0].time
    });
  } catch (error) {
    console.log(error);
    setError(error.message);
  }
};
export { createDocuments, UpdateDocuments, GetDocuments };
