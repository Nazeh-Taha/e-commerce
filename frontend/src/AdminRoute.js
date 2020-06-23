import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import CreateProductBage from "./bages/CreateProductBage";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";

function AdminRoute() {
  return (
    <Router>

          <PrivateRoute path="/admin/dashbord" component={CreateProductBage} />
          <Route path="/" component={UserRoute} exact/>
    
    </Router>
  );
}
export default AdminRoute;
