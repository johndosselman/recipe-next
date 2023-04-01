import { auth, db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default async function AddRecipe(name: string) {
  try {
    const credential = auth.currentUser;
    console.log(credential);
    await addDoc(collection(db, "users", auth.currentUser!.uid, "recipes"), {
      userId: auth.currentUser!.uid,
      name: `${name}`,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
