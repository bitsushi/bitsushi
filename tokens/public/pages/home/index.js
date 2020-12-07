import { useEffect, useState } from "preact/hooks";
import styles from "./style.module.css";

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function go() {
      const response = await fetch("https://token-metadata.airswap.io/tokens");
      const data = await response.json();
      console.log(
        data
          .filter(
            (row) =>
              row.kind === "ERC20" && row.airswapUI === "yes" && !row.banned
          )
          .sort((a, b) => a.symbol - b.symbol)
      );
    }

    go();
  }, []);

  return (
    <>
      <section class={styles.home}>
        <h1>Home</h1>
        <p>This is the home page.</p>
        <>
          <button style={{ width: 30 }} onClick={() => setCount(count - 1)}>
            -
          </button>
          <output style={{ padding: 10 }}>Count: {count}</output>
          <button style={{ width: 30 }} onClick={() => setCount(count + 1)}>
            +
          </button>
        </>
      </section>
    </>
  );
}
