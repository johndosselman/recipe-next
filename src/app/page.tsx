import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h3>J & W's</h3>
        <h1>Recipe Book</h1>
      </div>
      <div className={styles.searchbar}>
        <input
          className={styles.searchbar__input}
          type="text"
          name="search"
          id="search"
        />
        <svg
          className={styles.searchbar__icon}
          fill="#000000"
          height="1em"
          width="1em"
          viewBox="0 0 488.4 488.4"
        >
          <path
            d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
			s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
			S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
			S381.9,104.65,381.9,203.25z"
          />
        </svg>
      </div>
    </main>
  );
}
