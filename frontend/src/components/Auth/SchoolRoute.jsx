import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LANDING } from "../../constants/routes";

export const SchoolRoute = ({ component: Comp, path, user, ...rest }) => {
  var isSchool = localStorage.getItem("currentUserRole");
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return isSchool === "School" ? (
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

export default SchoolRoute;