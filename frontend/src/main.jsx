import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n.js";

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>

//       {/* Add router context */}
//       <React.Suspense fallback="loading....">
//         <App />
//       </React.Suspense>

//   </Provider>
// );

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Suspense fallback="loading....">
        <App />
      </React.Suspense>
    </BrowserRouter>
  </Provider>
);
