import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// scroll bar
import "simplebar/src/simplebar.css";

// project import
import GraphDashBoard from "./GraphDashBoard";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <GraphDashBoard />
  </StrictMode>
);
