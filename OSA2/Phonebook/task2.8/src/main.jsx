import ReactDOM from "react-dom/client";

import App from "./App";
import React from "react";

const persons = [{ name: "Arto Hellas" }];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App persons={persons} />
  </React.StrictMode>,
);
