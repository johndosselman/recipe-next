"use client";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import AddRecipe from "@/firestore/addRecipe";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";

export default function Page() {
  const credential = useContext(AuthContext);
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("");

  useEffect(() => {
    if (credential.user === null || !credential.user.emailVerified) {
      router.push("/");
    }
  }, [credential]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await AddRecipe(recipeName);
  };

  return (
    <>
      {credential.user?.emailVerified && (
        <>
          <h1>New Recipe</h1>
          <Link href="/">Home</Link>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setRecipeName(e.target.value)}
              id="recipe-name-field"
              label="Recipe Name"
              variant="outlined"
              required
            ></TextField>
            <Button type="submit">Add Recipe</Button>
          </form>
        </>
      )}
    </>
  );
}
