import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          {" "}
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="entrees">Entr{"\u00E9"}es</Link>
        </li>
        <li>
          <Link href="sides">Sides</Link>
        </li>
        <li>
          <Link href="desserts">Desserts</Link>
        </li>
      </ul>
    </div>
  );
}
