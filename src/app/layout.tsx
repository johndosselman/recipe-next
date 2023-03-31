"use client";
import { ThemeContextProvider } from "@/context/themeContext";
import Navbar from "./components/navbar/navbar";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <AuthContextProvider>
            <Navbar></Navbar>
            {children}
          </AuthContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
