import React from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import LandingPage from "../Pages/LandingPage";
import Home from "../Pages/Home";
import Read from "../Pages/Read";

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <PublicRoute exact path="/" component={LandingPage} />
                <PrivateRoute path="/Read/:id" component={Read} />
                <PrivateRoute path="/Home" component={Home} />
            </Switch>
        </Router>
    )
}
