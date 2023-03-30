"use client";
import React from "react";
import signInEmail from "@/auth/signInEmail";
import { useRouter } from "next/navigation";
import signInGoogle from "@/auth/signInGoogle";

export default function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const { result, error } = await signInEmail(email, password);

    if (error) {
      return console.log(error);
    }

    console.log(result);
    return router.push("/");
  };

  const handleGoogleSignIn = async () => {
    const { result, error } = await signInGoogle();
    if (error) {
      return console.log(error);
    }
    console.log(result);
    return router.push("/");
  };

  return (
    <div className="wrapper">
      <div>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      </div>
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign in</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
