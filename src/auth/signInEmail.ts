import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { FirebaseError } from "firebase/app";

export default async function signInEmail(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      return error.code;
    } else {
      console.log(error);
    }
  }
}
