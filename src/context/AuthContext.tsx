import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../firebase/config";

type AuthContextType = { user: FirebaseUser | null };

export const AuthContext = createContext<AuthContextType>({ user: null });

type Props = { children: React.ReactNode };

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
