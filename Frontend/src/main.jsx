import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Usercontextpovider from "./Context/Usercontextprovider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Usercontextpovider>
      <App />
    </Usercontextpovider>
  </React.StrictMode>
);
