import * as React from "react";
import * as ReactDOM from "react-dom";

export const Hello: React.FunctionComponent = (props: {}) => {
  return (
    <div className="app">
      <h1>Hello world</h1>
    </div>
  );
};

ReactDOM.render(<Hello />, document.getElementById("root"));
