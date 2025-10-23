import React from "react";
import { useState } from "react";
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

import CartProvider from "./components/CartContext"; 
export default function App({ initialPage = "home" }) {
  const [page, setPage] = useState(initialPage); 

  let content;
  switch (page) {
   case "home": content = <Home data-testid="home" />; break;
    case "productos": content = <Products data-testid="productos" />; break;
    case "aboutus": content = <AboutUs data-testid="aboutus" />; break;
    case "carrito": content = <Carrito data-testid="carrito" />; break;
    case "login": content = <Login data-testid="login" />; break;
    case "registro": content = <Registro data-testid="registro" />; break;
    default: content = <Home data-testid="home" />;
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


