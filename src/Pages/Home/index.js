import React, { useState } from "react";
import { API } from "../../Config/Api";
import { useQuery } from "react-query";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";

import Books from "../../Component/Books";
import LoadingScreen from "../../Component/LoadingScreen";

export default function HomeContainer() {
  const [BookCat, setBookCat] = useState();
  const { loading, error, data: categories } = useQuery(
    "getCategoriesData",
    async () => await API.get("/categories")
  );

  const handleClick = (e) => {
    setBookCat(e.target.name);
  };

  if (loading || !categories) {
    return error ? <h1>error {error.message} </h1> : <LoadingScreen />;
  } else {
    return (
      <>
        <div className="HomeTop">
          <div className="row">
            <div className="col-8">
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
                <img
                  src="fix-you.png"
                  alt="icon"
                  style={{
                    width: "70%",
                    height: "auto",
                    margin: "auto",
                    borderRadius: 10,
                  }}
                />
              </center>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-sm-6">
            <h4 className="list-title">List Book</h4>
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
                <Dropdown.Item onClick={() => setBookCat("")}>
                  All
                </Dropdown.Item>
                {categories.data.data.map((category, index) => (
                  <Dropdown.Item
                    key={category.id}
                    eventKey={category.id}
                    name={category.id}
                    onClick={handleClick}
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          </div>
        </div>

        <Books status="Approved" category={BookCat} />
      </>
    );
  }
}
