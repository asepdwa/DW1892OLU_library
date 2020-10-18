import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";

const PublicRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(LoginContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLogin ? (
          <Redirect to="/Home" />
        ) : (
            <Component {...props} />
          )
      }
    />
  );
};

export default PublicRoute;