// import "./styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./auth/auth-context.jsx";
import Mobile from "./components/Mobile.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Mobile>
        <App />
      </Mobile>
    </AuthProvider>
  </React.StrictMode>
);
