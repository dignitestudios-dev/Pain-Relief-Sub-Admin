import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router";
import { ToasterContainer } from "./components/global/Toaster.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToasterContainer/>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);