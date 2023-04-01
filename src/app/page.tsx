"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import handleSignOut from "@/auth/handleSignOut";
import { useRouter } from "next/navigation";

export default function Home() {
  const credential = useContext(AuthContext);
  const router = useRouter();

  const signOut = async () => {
    await handleSignOut();

    return router.push("/");
  };
  return (
    <main className={styles.main}>
      <h1>Home</h1>
      {credential.user ? (
        <div>
          <h3>Welcome, {credential.user.displayName}</h3>
          <Link href="/new-recipe">Add New Recipe</Link>
          <button onClick={signOut}>Log out</button>
        </div>
      ) : (
        <div>
          <Link href="/signup">Sign Up</Link>
          <Link href="/signin">Sign In</Link>
        </div>
      )}
    </main>
  );
}
