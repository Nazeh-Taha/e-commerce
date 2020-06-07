import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeBage from "./bages/HomeBage";
import ProductBage from "./bages/ProductBage";
import "./App.css";
import CartBage from "./bages/CartBage";
import SigninBage from "./bages/SigninBage";
import { useSelector } from "react-redux";
import RegisterBage from "./bages/RegisterBage";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  let open = true; // for sidebar
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
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">signin</Link>
            )}
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
            <Route path="/signin" component={SigninBage} />
            <Route path="/register" component={RegisterBage}/>
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
