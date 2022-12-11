import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.scss";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { AuthProvider } from "./context/auth-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root");
const root = createRoot(container);

axios.defaults.baseURL = "http://localhost:8080/api/v1/";
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <App />
      <ToastContainer></ToastContainer>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
