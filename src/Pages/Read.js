import React, { useContext } from "react";
import { ReactReader } from "react-reader";
import { Link, useParams, useHistory } from "react-router-dom";

import { BookContext } from "../Context/BookContext";
import icon from "../Assets/icon.png";

export default function Read() {
  const { id } = useParams();
  const history = useHistory();
  const [state] = useContext(BookContext);
  const book_data = state.bookData.filter((book) => book.id == id);

  // eslint-disable-next-line
  if (id == null || id == undefined || book_data[0] == undefined) {
    history.push("/Home");
    return <></>;
  } else {
    return (
      <div>
        <center>
          <header className="App-header mt-4">
            <p>
              <Link
                to="/Home"
                style={{ textDecoration: "none", color: "black" }}
              >
                <img src={icon} alt="icon" /> Lib'rary
              </Link>
            </p>
          </header>
        </center>
        <div style={{ position: "relative", height: "100vh" }}>
          <ReactReader
            url={book_data[0].source}
            title={book_data[0].title}
            location={"epubcfi(/6/1[cover]!/6)"}
            locationChanged={(epubcfi) => console.log(epubcfi)}
          />
        </div>
      </div>
    );
  }
}
