import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import UserData from "@/app/interfaces/userData";
import AddUser from "@/firestore/addUser";

const provider = new GoogleAuthProvider();

async function docExists(uid: string): Promise<boolean> {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

export default async function signInGoogle() {
  let result = null,
    error = null;
  try {
    result = await signInWithPopup(auth, provider);
    const credential = auth.currentUser!;
    const uid = credential.uid;

    const userData: UserData = {
      name: credential.displayName,
      email: credential.email!,
      theme: "light",
    };

    const userDocExists = await docExists(uid);

    if (!userDocExists) {
      await AddUser(uid, userData);
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
