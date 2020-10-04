import React, { useContext } from "react";

import Header from "../Component/Header";
import LpButton from "../Component/LpButton";

import { useHistory } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";

export default function LandingPage() {
  const history = useHistory();
  const [state] = useContext(LoginContext);

  if (state.isLogin) {
    history.push("/Home");
  }

  const containerStyle = {
    marginLeft: 40,
    marginTop: 120,
  };

  return (
    <div className="App">
      <Header />
      <div className="container" style={containerStyle}>
        <br />
        <br />
        <p className="quote">
          <i>Your</i> library
          <br />
          anywhere
        </p>
        <p className="note">
          Sign-up today and receive unlimited accesss to <br />
          all of your reading - share your book.
        </p>
        <br />
        <LpButton />
      </div>
    </div>
  );
}
