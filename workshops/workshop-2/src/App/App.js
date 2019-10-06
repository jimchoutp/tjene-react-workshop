import React from "react";

import StarWarsWikipedia from "./StarWarsWikipedia";
import styles from "./App.module.css";

function App() {
  const [time, setTime] = React.useState(Date.now());
 
  return (
    <>
      <aside className={styles.DevTool}>
        <h1>dev tool</h1>
        <button onClick={() => setTime(Date.now())}>Remount</button>      
      </aside>
      <StarWarsWikipedia key={time} />
    </>
  );
}

export default App;
