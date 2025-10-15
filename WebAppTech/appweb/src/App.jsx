import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Productos";
import AboutUs from "./pages/AboutUs";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/styles.css";

import CartProvider from "./components/CartContext"; // <- default export

export default function App() {
  const [page, setPage] = useState("home");

  let content;
  switch (page) {
    case "home": content = <Home />; break;
    case "productos": content = <Products />; break;
    case "aboutus": content = <AboutUs />; break;
    case "carrito": content = <Carrito />; break;
    case "login": content = <Login />; break;
    case "registro": content = <Registro />; break;
    default: content = <Home />;
  }

  return (
    <main>
          <Header setPage={setPage} />

          <CartProvider>
      <div className="d-flex">
        <div className="flex-grow-1">
          {content}
          
        </div>
      </div>
    </CartProvider>
    <Footer />
    </main>
    
  );
}
