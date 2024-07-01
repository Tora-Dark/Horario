import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.jsx";
import "./index.css";
import { HashRouter,BrowserRouter, useNavigate } from "react-router-dom";
import { baseUrl } from "./utils/baseURL.js";
const apiUrl = baseUrl();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter  basename="/api"> 
  <main className="light text-foreground bg-background">
      <App />
    </main>
     </BrowserRouter>  

);
