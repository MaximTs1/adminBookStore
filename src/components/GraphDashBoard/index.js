// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

// // scroll bar
// import "simplebar/src/simplebar.css";

// // third-party
// import { Provider as ReduxProvider } from "react-redux";

// // project import
// import GraphDashBoard from "./GraphDashBoard";
// import { store } from "store";

// // ==============================|| MAIN - REACT DOM RENDER  ||============================== //

// const container = document.getElementById("root");
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(
//   <StrictMode>
//     <BrowserRouter basename="/free">
//       <GraphDashBoard />
//     </BrowserRouter>
//   </StrictMode>
// );

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
