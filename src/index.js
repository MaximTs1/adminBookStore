import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./components/GraphDashBoard/store";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);
