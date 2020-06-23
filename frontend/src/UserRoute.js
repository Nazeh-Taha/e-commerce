import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeBage from "./bages/HomeBage";
import ProductBage from "./bages/ProductBage";
import "./App.css";
import CartBage from "./bages/CartBage";
import SigninBage from "./bages/SigninBage";
import RegisterBage from "./bages/RegisterBage";
import NavBar from "./component/Navbar";


function UserRoute() {
  return (
    <Router>
      <NavBar />
      <main className="main">
        <div className="content">
          <Route path="/" component={HomeBage} exact />
          <Route path="/signin" component={SigninBage} />
          <Route path="/register" component={RegisterBage} />
          <Route path="/cart/:id?" component={CartBage} />
          <Route path="/products/:id" component={ProductBage} />
        </div>
      </main>
      <footer className="footer">all right reserved.</footer>
    </Router>
  );
}

export default UserRoute;


