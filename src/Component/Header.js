import React, { useContext } from "react";
import icon from "../Assets/icon.png";

import { LoginContext } from "../Context/LoginContext";

export default function Header() {
  const [state] = useContext(LoginContext);

  return (
    <header className={state.isLogin ? "App-header" : "App-header-lp"}>
      <p>
        <img src={icon} alt="icon" /> Lib'rary
      </p>
    </header>
  );
}
