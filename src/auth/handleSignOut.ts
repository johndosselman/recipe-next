import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export default async function handleSignOut() {
  await signOut(auth);
}
