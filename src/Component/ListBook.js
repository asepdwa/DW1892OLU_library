import React, { useContext } from "react";
import { BookContext } from "../Context/BookContext";

export default function ListBook(props) {
  const [state] = useContext(BookContext);

  return (
    <div className="row mt-4">
      {state.bookData.slice(0, props.value).map((book, index) => (
        <div className="col-sm-3">
          <div className="list-book">
            <img src={book.image} alt={book.title} />
            <br />
            <h4 className="mt-4">{book.title}</h4>
            <p>{book.user}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
