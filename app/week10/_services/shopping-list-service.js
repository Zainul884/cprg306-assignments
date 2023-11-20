import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

async function getItems(userId) {
    const items = [];
    const itemsCollectionRef = collection(db, "users", userId, "items");
    const q = query(itemsCollectionRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
    });

    return items;
}

async function addItem(userId, item) {
    const itemsCollectionRef = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemsCollectionRef, item);
    return docRef.id;
}
