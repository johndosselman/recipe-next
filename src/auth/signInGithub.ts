import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "../firebase/config";

const provider = new GithubAuthProvider();

export default async function signInGithub() {
  let result = null,
    error = null;
  try {
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
