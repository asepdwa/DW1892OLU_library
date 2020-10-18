import React from "react";

import Header from "../Component/Header";
import LandingPageButton from "../Component/LandingPageButton";

export default function LandingPage() {

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
          Sign-up today and receive unlimited
          <br />
          accesss to all of your reading - shared
          <br />
          your book.
        </p>
        <br />
        <LandingPageButton />
      </div>
    </div>
  );
}
