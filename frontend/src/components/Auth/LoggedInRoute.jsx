import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LANDING } from "../../constants/routes";

export const LoggedInRoute = ({ component: Comp, path, ...rest }) => {
  var isLoggedIn = localStorage.getItem("currentUserUID");
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return isLoggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: LANDING,
            }}
          />
        );
      }}
    />
  );
};

export default LoggedInRoute;
