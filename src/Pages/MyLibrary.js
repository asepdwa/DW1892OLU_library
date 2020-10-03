import React, { useContext } from "react";

import ListBook from "../Component/ListBook";
import { BookContext } from "../Context/BookContext";

export default function MyLibrary() {
  const [state] = useContext(BookContext);

  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <h4 className="list-title">My Library</h4>
        </div>
      </div>
      <ListBook value="3" />
    </>
  );
}
