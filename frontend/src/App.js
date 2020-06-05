import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeBage from "./bages/HomeBage";
import ProductBage from "./bages/ProductBage";
import "./App.css";
import CartBage from "./bages/CartBage";

function App() {
  let open = true;
  const openMenu = () => {
    if (open === true) {
      document.querySelector(".asidebar").classList.add("open");
      open = false;
    } else {
      document.querySelector(".asidebar").classList.remove("open");
      open = true;
    }
  };
  return (
    <Router>
      <div className="grade-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">e-commerce</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            <a href="signin.html">Sign In</a>
          </div>
        </header>
        <aside className="asidebar">
          <h3>Shoping Categories</h3>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/" component={HomeBage} exact />
            <Route path="/cart/:id?" component={CartBage} />
            <Route path="/products/:id" component={ProductBage} />
          </div>
        </main>
        <footer className="footer">all right reserved.</footer>
      </div>
    </Router>
  );
}

export default App;
