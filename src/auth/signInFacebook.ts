import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";

const provider = new FacebookAuthProvider();

export default async function signInFacebook() {
  let result = null,
    error = null;
  try {
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
