import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext"; // ✅ ADD THIS
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>   {/* ✅ IMPORTANT */}
      <App />
    </CartProvider>
  </AuthProvider>
);