import React from "react";
import { ReactReader } from "react-reader";
import icon from "../Assets/icon.png";

export default function Read() {
  return (
    <div>
      <center>
        <header className="App-header mt-4">
          <p>
            <img src={icon} alt="icon" /> Lib'rary
          </p>
        </header>
      </center>
      <div style={{ position: "relative", height: "100vh" }}>
        <ReactReader
          url={"/Assets/Book/harry-potter-and-the-goblet-of-fire.epub"}
          title={"Alice in wonderland"}
          location={"epubcfi(/6/1[cover]!/6)"}
          locationChanged={(epubcfi) => console.log(epubcfi)}
        />
      </div>
    </div>
  );
}
