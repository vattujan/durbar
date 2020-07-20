import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LANDING } from "../../constants/routes";

export const AdminRoute = ({ component: Comp, path, user, ...rest }) => {
  var isAdmin = localStorage.getItem('currentUserRole')
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return isAdmin === 'Admin' ? (
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


export default AdminRoute;

