import React, { useContext, useState } from "react";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";

import ListBook from "./ListBook";
import { BookContext } from "../Context/BookContext";

export default function HomeContainer() {
  const [state] = useContext(BookContext);
  const [BookCat, setBookCat] = useState();

  const handleClick = (e) => {
    setBookCat(e.target.name);
  };

  const bookFilter = state.bookData.filter(
    (book) => book.status === "Approved"
  );
  const bookRandomData =
    bookFilter[Math.floor(Math.random() * bookFilter.length)];

  return (
    <>
      <div className="HomeTop">
        <div className="row">
          <div className="col-sm-8">
            <div className="mt-5" style={{ width: "60%", margin: "auto" }}>
              <p className="quote-md">
                Share, read
                <br />
                and <i>love</i>
              </p>
              <p className="note-md">Reading is fascinating</p>
            </div>
          </div>
          <div className="col-sm-4" style={{ padding: 20 }}>
            <center>
              {bookRandomData && (
                <img
                  src={bookRandomData.image}
                  alt="icon"
                  style={{ width: "60%", height: "auto", margin: "auto" }}
                />
              )}
            </center>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-sm-6">
          <h4 className="list-title" onClick={() => setBookCat("")}>
            List Book
          </h4>
        </div>
        <div className="col-sm-6">
          <div className="mb-2">
            <DropdownButton
              as={ButtonGroup}
              key="left"
              id="dropdown-button-drop-left"
              drop="left"
              variant="light"
              title="Category"
              style={{ float: "right", width: "30%", height: 45 }}
            >
              {state.bookData
                .filter((b) => b.status === "Approved")
                .map((b) => b.category)
                .filter((c, i, a) => a.indexOf(c) === i)
                .sort((c1, c2) => c1.localeCompare(c2))
                .map((category, index) => (
                  <Dropdown.Item
                    eventKey={category}
                    name={category}
                    onClick={handleClick}
                  >
                    {category}
                  </Dropdown.Item>
                ))}
            </DropdownButton>
          </div>
        </div>
      </div>

      {BookCat ? <ListBook category={BookCat} /> : <ListBook />}
    </>
  );
}
