import React, { useContext } from "react";
import ListBook from "../Component/ListBook";
import { BookContext } from "../Context/BookContext";

export default function MyLibrary() {
  const [state] = useContext(BookContext);
  return (
    <>
      <ListBook value={state.bookData.length} />
    </>
  );
}
