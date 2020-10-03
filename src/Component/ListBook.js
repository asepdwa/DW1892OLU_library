import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../Context/BookContext";

export default function ListBook(props) {
  const [state] = useContext(BookContext);

  if (props.category) {
    return (
      <div className="row mt-4">
        {state.bookData
          .filter((book) => book.category === props.category && book.confirm)
          .map((book, index) => (
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
  } else {
    return (
      <div className="row mt-4">
        {state.bookData
          .filter((book) => book.confirm)
          .slice(0, props.value)
          .map((book, index) => (
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
}
