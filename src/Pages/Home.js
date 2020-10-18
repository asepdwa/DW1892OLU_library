import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import HomeRouter from "../Routes/HomeRouter";

import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";

export default function Home() {
  const match = useRouteMatch();

  return (<div className="container-fluid mt-4">
    <div className="row">
      <div className="col-sm-3" id="fixed">
        <center>
          <Link to={`${match.url}`} style={{ textDecoration: "none" }}>
            <Header />
          </Link>
          <Sidebar />
        </center>
      </div>
      <div className="col-sm-9 mt-2">
        <div className="container">
          <HomeRouter />
        </div>
      </div>
    </div>
  </div>
  );
}
