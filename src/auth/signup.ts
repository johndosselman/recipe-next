import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default async function signUp(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
