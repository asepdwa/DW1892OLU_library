import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";

import BookContextProvider from "../Context/BookContext";
import HomeContainer from "../Component/HomeContainer";

import Profile from "../Pages/Profile";
import MyLibrary from "../Pages/MyLibrary";
import AddBook from "../Pages/AddBook";
import Header from "../Component/Header";
import Navs from "../Component/Navs";
import Detail from "../Component/Detail";

export default function Home(props) {
  const match = useRouteMatch();

  return (
    <BookContextProvider>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-sm-3" id="fixed">
            <center>
              <Link to={`${match.url}`}>
                <Header />
              </Link>
              <Navs />
            </center>
          </div>
          <div className="col-sm-9 mt-2">
            <div className="container">
              <Switch>
                <Route exact path={match.path} component={HomeContainer} />
                <Route path={`${match.path}/Profile`} component={Profile} />
                <Route path={`${match.path}/MyLibrary`} component={MyLibrary} />
                <Route path={`${match.path}/AddBook`} component={AddBook} />
                <Route path={`${match.path}/Detail/:id`} component={Detail} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </BookContextProvider>
  );
}
