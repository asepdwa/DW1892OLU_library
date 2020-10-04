import React from "react";
import "./Assets/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginContextProvider from "./Context/LoginContext";
import BookContextProvider from "./Context/BookContext";

import PrivateRoute from "./Component/PrivateRoute";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";
import Read from "./Pages/Read";

export default function App() {
  return (
    <LoginContextProvider>
      <BookContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute path="/Read" component={Read} />
            <PrivateRoute path="/Home" component={Home} />
          </Switch>
        </Router>
      </BookContextProvider>
    </LoginContextProvider>
  );
}
