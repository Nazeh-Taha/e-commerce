import React from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import HomeBage from "./bages/HomeBage";
import ProductBage from "./bages/ProductBage";
import "./App.css";
import CartBage from "./bages/CartBage";
import SigninBage from "./bages/SigninBage";
import RegisterBage from "./bages/RegisterBage";
// import CreateProductBage from "./bages/CreateProductBage";
import PrivateRoute from "./PrivateRoute";
import NavBar from "./component/Navbar";
import { useLocation } from "react-use";
// import AdminRoute from "./AdminRoute";
import AdminHome from "./adminBages/AdminHome"

function App() {
  let path = useLocation();
  console.log(path.pathname)
  return (
    <Router>
      {path.pathname.match(/admin/) ? null : <NavBar />}

          <Route path="/" component={HomeBage} exact />
          <Route path="/signin" component={SigninBage} />
          <Route path="/register" component={RegisterBage} />
          <Route path="/cart/:id?" component={CartBage} />
          <Route path="/products/:id" component={ProductBage} />
          {/* admin Routes */}
          <PrivateRoute path="/admin/dashbord" component={AdminHome} exact/>

      {path.pathname.match(/admin/) ? null : (
        <footer className="footer">all right reserved.</footer>
      )}
    </Router>
  );
}

export default App;
