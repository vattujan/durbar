import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LANDING } from "../../constants/routes";
import { withRouter } from 'react-router-dom';

export const StudentRoute = ({ component: Comp, path, ...rest }) => {
  var isStudent = localStorage.getItem("currentUserRole");
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return isStudent === "Student" ? (
          <Comp {...props} />
        ) : (
            <Redirect to={{ pathname: LANDING }} />
          );
      }}
    />
  );
};
export default withRouter(StudentRoute);
