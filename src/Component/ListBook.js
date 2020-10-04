import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../Context/BookContext";

export default function ListBook(props) {
  const [state] = useContext(BookContext);
  let bookData = props.myLibrary
    ? state.bookData.filter(
        (book) =>
          book.status === "Approved" && state.libraryData.includes(book.id)
      )
    : state.bookData.filter((book) => book.status === "Approved");

  if (props.category) {
    bookData = bookData.filter((book) => book.category === props.category);
  }

  return (
    <div className="row mt-4">
      {bookData.map((book, index) => (
        <div className="col-sm-3">
          <div className="list-book">
            <Link to={`/Home/Detail/${book.id}`}>
              <img src={book.image} alt={book.title} />
            </Link>
            <br />
            <h4 className="mt-4">{book.title}</h4>
            <p>{book.user}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
