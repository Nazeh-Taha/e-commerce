import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminHome from "./adminBages/AdminHome"
import "./App.css";

import CreateProductBage from "./bages/CreateProductBage";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";

function AdminRoute() {
  return (
    <Router>

          <PrivateRoute path="/admin/dashbord" component={AdminHome} />
      
    
    </Router>
  );
}
export default AdminRoute;
