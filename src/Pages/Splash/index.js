import React from "react";
import Logo from "../../Assets/logo.svg";

export default function Splash() {
  return (
    <div className="container">
      <div className="splash-screen">
        <img style={{ width: "25vw", height: "auto" }} src={Logo} alt="icon" />
      </div>
    </div>
  );
}
