import React from "react";
import "./App.css";
import ExpensiveToRender from "./ExpensiveToRender.jsx";

function App({ children }) {
  const [state, setState] = React.useState(false);

  function expensive() {
    return Array(1000)
      .fill("")
      .map((value, index) => <div key={index} className="Box" />);
  }

  const expensiveOperations = expensive();
  const memoizedExpensiveOperations = React.useMemo(expensive, []);

  return (
    <div className="App">
      <div>State: {String(state)}</div>
      <button onClick={() => setState(state => !state)}>Force re-render</button>
      <div className="BoxWrapper">{expensiveOperations}</div>
      <div className="BoxWrapper">{memoizedExpensiveOperations}</div>
      <ExpensiveToRender />
      {children}
    </div>
  );
}

export default App;
