import React from "react";
import "./App.css";

function ExpensiveToRender() {
  React.useEffect(() => console.log("You rendering an expansive component!"));

  return <div>A complex component that's expensive to render</div>;
}

export default ExpensiveToRender;
