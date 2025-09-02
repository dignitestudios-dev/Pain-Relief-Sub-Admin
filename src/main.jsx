import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router";
import { ToasterContainer } from "./components/global/Toaster.jsx";
import { AppProvider } from "./context/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>App is under construction</div>
    {/* <BrowserRouter>
      <ToasterContainer />
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter> */}
  </React.StrictMode>
);
