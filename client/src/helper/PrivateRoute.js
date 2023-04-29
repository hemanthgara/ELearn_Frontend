import React from "react";
import { Navigate } from "react-router-dom";

import GetUser from "./GetUser";

const PrivateRoute = (props) => {
  const { loggedInUser, fetchingUser } = GetUser();

  if (fetchingUser) {
    return (
      <div className="videodetail-container d-flex justify-content-center align-items-center fs-1 fw-bold">
        <img src="/load.gif" alt="loading" width="300" />
      </div>
    );
  }

  if (loggedInUser) {
    return props.children;
  } else {
    return <Navigate to="/signin" />;
  }
};

export { PrivateRoute };
