import React, { useContext, useEffect, Suspense } from "react";
import { ReactQueryConfigProvider } from "react-query";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { API, setAuthToken } from "./Config/Api";

import "./Assets/App.css";
import { LoginContext } from "./Context/LoginContext";

import PrivateRoute from "./Component/PrivateRoute";
import PublicRoute from "./Component/PublicRoute";
import LoadingScreen from "./Component/LoadingScreen";

import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";
import Read from "./Pages/Read";

const queryConfig = {
  suspense: true,
};

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  // eslint-disable-next-line
  const [state, dispatch] = useContext(LoginContext);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await API.get("/auth");

        dispatch({
          type: "LOAD_USER",
          payload: res.data.data,
        });

      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        })
      }
    };

    loadUser();
  }, []);

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Suspense fallback={<LoadingScreen />}>
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={LandingPage} />
            <PrivateRoute path="/Read/:id" component={Read} />
            <PrivateRoute path="/Home" component={Home} />
          </Switch>
        </Router>
      </Suspense>
    </ReactQueryConfigProvider>
  );
}
