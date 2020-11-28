import React from "react";
import Icon from "../Assets/icon.svg";

export default function Header(props) {
  const { imgStyle } = props;

  return (
    <header className={props.home ? "App-header" : "App-header-lp"}>
      <p>
        <img src={Icon} alt="icon" stlye={imgStyle} /> Lib'rary
      </p>
    </header>
  );
}

Header.defaultProps = {
  width: "8em",
  height: "auto",
  home: false,
};
