import React from 'react'
import { useRouteMatch, Switch, Route } from "react-router-dom";

import Profile from "../Pages/Profile";
import MyLibrary from "../Pages/MyLibrary";
import AddBook from "../Pages/AddBook";
import BookVerif from "../Pages/BookVerif";

import HomeContainer from "../Component/HomeContainer";
import Detail from "../Component/Detail";

export default function HomeRouter() {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.path} ><HomeContainer /></Route>
            <Route path={`${match.path}/Profile`} component={Profile} />
            <Route path={`${match.path}/MyLibrary`} component={MyLibrary} />
            <Route path={`${match.path}/AddBook`} component={AddBook} />
            <Route path={`${match.path}/Detail/:id`} component={Detail} />
            <Route path={`${match.path}/BookVerif`} component={BookVerif} />
        </Switch>
    )
}
