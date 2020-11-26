import React from "react";
import Books from "../../Component/Books";

export default function MyLibrary() {
  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <h4 className="list-title">My Library</h4>
        </div>
      </div>
      <Books bookmarks={true} query="getBookmarksData" />
    </>
  );
}
