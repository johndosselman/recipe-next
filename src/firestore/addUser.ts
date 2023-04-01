import UserData from "@/app/interfaces/userData";
import { db } from "@/firebase/config";
import { setDoc, doc } from "firebase/firestore";

export default async function AddUser(uid: string, userData: UserData) {
  try {
    await setDoc(doc(db, "users", uid), userData);
  } catch (e) {
    console.log(e);
  }
}
