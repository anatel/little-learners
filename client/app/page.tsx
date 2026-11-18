import styles from "./page.module.css";

// A Server Component (no "use client"): Next.js renders it to HTML on the
// server, and the browser receives ready-made markup. It has no state or
// event handlers yet, so it doesn't need to run in the browser at all.
export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>למדנים קטנים</h1>
      <div className={styles.hero} role="img" aria-label="ינשוף">
        🦉
      </div>
    </main>
  );
}
