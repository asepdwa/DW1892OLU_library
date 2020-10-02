import React, { useContext } from "react";
import "./Assets/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./Component/PrivateRoute";
import LoginContextProvider from "./Context/LoginContext";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";

export default function App() {
  return (
    <LoginContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute path="/Home" component={Home} />
        </Switch>
      </Router>
    </LoginContextProvider>
  );
}
