"use client";
import "./globals.css";
import Navbar from "./navbar";
import { AuthContextProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Recipes",
  description: "Recipe app using NextJs 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
