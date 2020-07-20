import React from "react";
import firebase from "../../firebase";
import { Route, Redirect } from "react-router-dom";
import { LANDING } from "../../constants/routes";

export const SchoolRoute = ({ component: Comp, path, ...rest }) => {
  var userID = localStorage.getItem("currentUserUID");
  var parentUID = localStorage.getItem("parentUID");
  var check;
  firebase
    .database()
    .ref("/users/" + userID)
    .on("value", (snapshot) => {
      if (snapshot.val()) {
        check = (snapshot.val().parentUID || userID);
      }
    });
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return check === (parentUID || userID) ? (
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
