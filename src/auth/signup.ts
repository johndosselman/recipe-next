import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import AddUser from "@/firestore/addUser";
import { UserData } from "@/app/interfaces/interfaces";

export default async function signUp(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    const uid = auth.currentUser!.uid;
    console.log(uid);
    const userData: UserData = {
      name: null,
      email: email,
      theme: "light",
    };
    await AddUser(uid, userData);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
