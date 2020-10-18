import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { API } from "../Config/Api";
import { useQuery } from "react-query";
import { LoginContext } from "../Context/LoginContext";
import LoadingScreen from "./LoadingScreen";

export default function ListBook(props) {
  const [state] = useContext(LoginContext);
  const { loading, error, data: books, refetch } = useQuery(
    "getBooksData",
    async () => await API.get("/books")
  );

  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/book/${id}`)
      refetch();
      alert(res.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading || !books) {
    return error ? (
      <h1>error {error.message} </h1>
    ) : <LoadingScreen />;
  } else {
    let bookData = props.myLibrary
      ? state.userData.bookmarks_data
      : props.myBook
        ? books.data.data.filter((book) => book.userId === state.userData.id)
        : books.data.data.filter((book) => book.status === "Approved");

    bookData = props.category ? bookData.filter((book) => book.catId === parseInt(props.category)) :
      bookData;

    return (
      <div className="row mt-4">
        {bookData.length > 0 ? bookData.map((book, index) => (
          <div key={index} className="col-sm-3">
            {book.status !== "Approved" && (
              <div className="need-confirm">
                <p>{book.status}</p>
              </div>
            )}
            <div className="list-book">
              <Link to={`/Home/Detail/${book.id}`}>
                <img src={book.thumbnailUrl} alt={book.title} />
              </Link>
              {props.myBook && <button onClick={() => handleDelete(book.id)} className="btn" style={{
                position: "absolute",
                top: 5,
                left: "77%",
                backgroundColor: "#555",
                color: "white",
                fontSize: 15,
                padding: 2,
                borderRadius: "100%",
                display: "block",
                zIndex: 10,
                textAlign: "center",
              }}> X </button>}
              <br />
              <h4 className="mt-4">{book.title}</h4>
              <p>{book.author.fullName}</p>
            </div>
          </div>
        )) : (<div style={{ width: "90%", margin: "auto", display: "block" }} className="alert alert-warning" role="alert">
          <h4 className="alert-heading" style={{ textAlign: "center" }}>{
            props.category
              ? "Books with that category were not found"
              : props.myLibrary ? "You don't have book that added to your library"
                : props.myBook ? "You don't have any book"
                  : "Book is not found"}</h4>
        </div>)
        }
      </div >
    );
  }
}
