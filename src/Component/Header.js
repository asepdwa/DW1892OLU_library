import React from "react";

export default function Header(props) {
  const { imgStyle } = props;

  return (
    <header className={props.home ? "App-header" : "App-header-lp"}>
      <p>
        <img src="icon.svg" alt="icon" stlye={imgStyle} /> Lib'rary
      </p>
    </header>
  );
}

Header.defaultProps = {
  width: "10em",
  height: "auto",
  home: false,
};
