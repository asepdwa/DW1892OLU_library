import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
  Link,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import PrivateRoute from "./PrivateRoute";
import Detail from "../Pages/Detail";
import Read from "../Pages/Read";
import LandingPage from "../Pages/LandingPage";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import Verification from "../Pages/Verification";
import AddBook from "../Pages/AddBook";
import MyLibrary from "../Pages/MyLibrary";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import NotFound from "../Pages/NotFound";

const routerFadeAnimated = withRouter(({ location }) => (
  <div className="container-fluid mt-4">
    <div className="row">
      <div className="col-sm-3" id="fixed">
        <center>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Header home={true} />
          </Link>
          <Sidebar />
        </center>
      </div>

      <div className="col-sm-9 mt-2">
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={1000}>
            <div className="container">
              <Switch location={location}>
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/mylibrary" component={MyLibrary} />
                <PrivateRoute path="/detail/:id" component={Detail} />
                <PrivateRoute path="/add" component={AddBook} />
                <PrivateRoute path="/verification" component={Verification} />
                <Route path="/detail">
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  </div>
));

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <PrivateRoute
          path={[
            "/home",
            "/profile",
            "/mylibrary",
            "/detail",
            "/add",
            "/verification",
          ]}
        >
          {routerFadeAnimated}
        </PrivateRoute>
        <PrivateRoute path="/read/:id" component={Read} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
