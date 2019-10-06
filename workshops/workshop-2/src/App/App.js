import React from "react";

import StarWarsWikipedia from "./StarWarsWikipedia";
import styles from "./App.module.css";

function App() {
  const [time, setTime] = React.useState(Date.now());
  const [pollResources, setPollResources] = React.useState(false);

  return (
    <>
      <aside className={styles.DevTool}>
        <h1>dev tool</h1>
        <button onClick={() => setTime(Date.now())}>Remount</button>
        <button
          onClick={() => {
            // Warning: A hack to force polling resources for the demo
            setPollResources(new Boolean(true));
          }}
        >
          Auto refresh resources
        </button>
      </aside>
      <StarWarsWikipedia key={time} pollResources={pollResources} />
    </>
  );
}

export default App;
