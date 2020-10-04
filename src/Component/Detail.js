import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaRegBookmark, FaBookOpen } from "react-icons/fa";
import { useParams, useHistory, Link } from "react-router-dom";
import { BookContext } from "../Context/BookContext";

export default function Detail() {
  const [state, dispatch] = useContext(BookContext);
  const [addLibrary, setAddLibrary] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  // eslint-disable-next-line
  const book_data = state.bookData.filter((book) => book.id == id);

  const AddThisBook = () => {
    dispatch({
      type: "ADD_LIBRARY",
      libraryLoad: book_data[0].id,
    });
    setAddLibrary(true);
  };

  // eslint-disable-next-line
  if (id == null || id == undefined || book_data[0] == undefined) {
    history.push("/Home");
    return <></>;
  } else {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-5">
            <img
              src={book_data[0].image}
              style={{
                width: "85%",
                height: "auto",
                margin: "auto",
                display: "block",
              }}
              alt={book_data[0].title}
            />
          </div>
          <div className="col-sm-7">
            <h3
              style={{
                fontSize: 50,
                fontFamily: "Times New Roman",
                fontWeight: 750,
              }}
            >
              {book_data[0].title}
            </h3>
            <p className="detail-data" style={{ fontSize: 18 }}>
              {book_data[0].user}
            </p>
            <p className="detail-type">Publication Date</p>
            <p className="detail-data">{book_data[0].date}</p>
            <p className="detail-type">Category</p>
            <p className="detail-data">{book_data[0].category}</p>
            <p className="detail-type">Pages</p>
            <p className="detail-data">{book_data[0].pages}</p>
            <p className="detail-type" style={{ color: "#ee4622" }}>
              ISBN
            </p>
            <p className="detail-data">{book_data[0].isbn}</p>
          </div>
        </div>
        <hr
          style={{
            border: "1px solid #c9c9c9",
            marginBottom: 40,
            marginTop: 30,
          }}
        />
        <div class="container">
          <h3
            style={{
              fontSize: 35,
              fontFamily: "Times New Roman",
              fontWeight: 750,
              marginBottom: 30,
            }}
          >
            About This Book
          </h3>
          <p style={{ textAlign: "justify" }} className="detail-data">
            {book_data[0].description}
          </p>
          <br />
          <div
            className="mb-4"
            style={{ display: "flex", flexDiretion: "column", float: "right" }}
          >
            {!state.libraryData.includes(book_data[0].id) && (
              <button
                className="btn-custom"
                style={{ width: 120, marginTop: 0, marginRight: 10 }}
                onClick={AddThisBook}
              >
                Add Library <FaRegBookmark />
              </button>
            )}
            <Link to={`/Read/${book_data[0].id}`}>
              <button className="btn btn-light" style={{ height: 40 }}>
                Read Book <FaBookOpen />
              </button>
            </Link>
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={addLibrary}
              onHide={() => setAddLibrary(false)}
            >
              <div
                className="alert alert-success"
                style={{ margin: 10, textAlign: "center" }}
              >
                Add book to My Library successfully
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
