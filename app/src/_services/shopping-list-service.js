
import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query , doc } from "firebase/firestore";
export const getItems = async (userID) => {
    try {
      const itemsCollectionRef = collection(db, `users/${userID}/items`);
      const itemsSnap = await getDocs(itemsCollectionRef);
  
        return itemsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

    } catch (error) {
      console.error("Error in getItems: ", error);
    }
};

export async function addItem(userId, item) {
    const itemsCollection = collection(db, `users/${userId}/items`);
    const itemRef = await addDoc(itemsCollection, item);
    return itemRef.id;
}