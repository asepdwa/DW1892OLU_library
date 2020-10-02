import React, { useContext } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { LoginContext } from "../Context/LoginContext";
import BookContextProvider from "../Context/BookContext";
import HomeContainer from "../Component/HomeContainer";

import Profile from "../Pages/Profile";
import MyLibrary from "../Pages/MyLibrary";
import AddBook from "../Pages/AddBook";
import Header from "../Component/Header";
import Navs from "../Component/Navs";

export default function Home(props) {
  const match = useRouteMatch();
  const [state] = useContext(LoginContext);

  return (
    <BookContextProvider>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-sm-3">
            <center>
              <Header />
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
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </BookContextProvider>
  );
}
