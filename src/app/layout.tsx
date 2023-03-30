import "./globals.css";
import Navbar from "./navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
