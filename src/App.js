import React from 'react';
import './Assets/App.css';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Link,
//   Route,
//   Redirect,
// } from "react-router-dom";

import LandingPage from './Pages/LandingPage';
// import Home from './Pages/Home';

export default function App() {
  return (
  //   <Router>
  //     <nav>
  //       <ul style={{ display: "flex", flexDirection: "row" }}>
  //         <li style={{ marginRight: 50 }}>
  //           <Link to="/">Home</Link>
  //         </li>
  //         <li style={{ marginRight: 50 }}>
  //           <Link to="/LandingPage">LandingPage</Link>
  //         </li>
  //       </ul>
  //     </nav>
  //     <Switch>
  //       <Route path="/" component={Home} exact/>
  //       <Route path="/LandingPage" component={LandingPage}/>
  //     </Switch>

  // </Router>
      <LandingPage/>
  );
}