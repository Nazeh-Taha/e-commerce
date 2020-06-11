import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;


  if (userInfo) {
    return (
      <Route
        path={path}
        render={(props) =>
          userInfo.isAdmin ? <Component {...props} /> : <Redirect to={"/"} />
        }
      />
    );
  } else {
    return <Redirect to={"/"} />;
  }
};
export default PrivateRoute;
