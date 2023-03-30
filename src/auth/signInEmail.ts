import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default async function signInEmail(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
