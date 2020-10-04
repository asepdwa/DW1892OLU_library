import React, { useContext, useState } from "react";
import { BookContext } from "../Context/BookContext";
import { BiBookAdd } from "react-icons/bi";
import { useHistory } from "react-router-dom";

export default function AddBook() {
  const [state, dispatch] = useContext(BookContext);
  const history = useHistory();

  let userData_Saved = localStorage.getItem("loginData")
    ? JSON.parse(localStorage.getItem("loginData"))
    : [];

  const [formData, setFormData] = useState({
    id: state.bookData.length + 1,
    user: userData_Saved.name,
    title: "",
    category: "",
    date: "",
    pages: "",
    isbn: "",
    image: "",
    source: "",
    status:
      userData_Saved.role === "Admin" ? "Approved" : "Waiting to be verified",
    description: "",
  });

  const { title, category, date, pages, isbn, image, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      title.length > 3 &&
      category.length > 3 &&
      date.length > 3 &&
      pages.length > 0 &&
      description.length > 3 &&
      isbn.length > 3 &&
      image.length > 3
    ) {
      alert(
        userData_Saved.role === "Admin"
          ? "The book has been added"
          : "The book has been added, check ur profile and wait for confirmation from the admin ..."
      );
      dispatch({
        type: "ADD_BOOK",
        bookLoad: formData,
      });
      history.push("/Home/Profile");
    } else {
      alert("Fill in the form correctly ...");
    }
  };

  return (
    <div className="container" style={{ marginBottom: 80 }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <h3 className="list-title" style={{ paddingLeft: 0 }}>
            Add Book
          </h3>
        </div>
        <br />
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="date"
            placeholder="Publication Date"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="category"
            placeholder="Category"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="pages"
            placeholder="Pages"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="isbn"
            placeholder="ISBN"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="image"
            placeholder="Book cover image url (Ex: http://localhost/image.jpg)"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            name="description"
            placeholder="About this book ..."
            rows="5"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label>
            <b>Attache Book File</b>
          </label>
          <input
            type="file"
            className="form-control-file"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          className="btn btn-danger"
          type="submit"
          style={{ background: "#EE4622", float: "right" }}
        >
          Add Book <BiBookAdd size="24" />
        </button>
      </form>
    </div>
  );
}
