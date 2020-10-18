import React from "react";
import ListBook from "../Component/ListBook";

export default function MyLibrary() {
  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <h4 className="list-title">My Library</h4>
        </div>
      </div>
      <ListBook myLibrary={true} />
    </>
  );
}
