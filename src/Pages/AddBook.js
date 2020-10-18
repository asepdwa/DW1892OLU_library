import React, { useContext, useState } from "react";
import { API } from "../Config/Api";
import { useMutation } from "react-query";
import { BiBookAdd } from "react-icons/bi";
import { FaPaperclip, FaRegFileImage } from "react-icons/fa"
import { useHistory } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";

export default function AddBook() {
  const history = useHistory();
  const [state] = useContext(LoginContext);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    publication: "",
    pages: "",
    isbn: "",
    thumbnail: null,
    file: null,
    aboutBook: "",
  });

  const { title, category, publication, pages, isbn, thumbnail, file, aboutBook } = formData;

  const handleChange = (e) => {
    // Check Form Type
    e.target.type === "file"
      ? setFormData({ ...formData, [e.target.name]: e.target.files[0] })
      : setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [handleSubmit] = useMutation(async () => {
    if (
      title.length > 4 &&
      category.length > 4 &&
      publication.length > 4 &&
      pages.length > 0 &&
      aboutBook.length > 10 &&
      isbn.length > 4
    ) {
      try {
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        let body = new FormData();
        body.append("title", title);
        body.append("publication", publication);
        body.append("userId", state.userData.id);
        body.append("category", category);
        body.append("pages", pages);
        body.append("isbn", isbn);
        body.append("aboutBook", aboutBook);
        body.append("thumbnail", thumbnail);
        body.append("file", file);
        body.append("status", state.userData.role === "Admin" ? "Approved" : "Waiting to be verified");

        await API.post("/book", body, config);

        setFormData({
          title: "",
          publication: "",
          category: "",
          pages: "",
          isbn: "",
          aboutBook: "",
        });
        alert(
          state.userData.role === "Admin"
            ? "Thank you for adding your own books to our website"
            : "Thank you for adding your own books to our website, please wait 1 x 24 hours to verifying by admin"
        );
        history.push("/Home/Profile");
      } catch (error) {
        alert(error.response.data.error.message)
      }
    } else {
      alert("Fill in the form correctly ...");
    }
  });

  return (
    <div className="container" style={{ marginBottom: 80 }}>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
            name="publication"
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
          <textarea
            className="form-control"
            name="aboutBook"
            placeholder="About this book ..."
            rows="5"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control-file"
            name="thumbnail"
            id="thumbnail"
            accept="image/*"
            onChange={(e) => handleChange(e)}
            style={{ display: "none" }}
          />
          <label for="thumbnail" className="btn btn-danger" style={{ background: "#EE4622" }}>
            {!thumbnail ? "Attache Thumbnail" : thumbnail.name} <FaRegFileImage size="22" />
          </label>
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control-file"
            name="file"
            id="file"
            accept=".epub"
            onChange={(e) => handleChange(e)}
            style={{ display: "none" }}
          />
          <label for="file" className="btn btn-danger" style={{ background: "#EE4622" }}>
            {!file ? "Attache Ebook File (epub)" : file.name} <FaPaperclip size="22" />
          </label>
        </div>
        <button
          className="btn btn-danger"
          type="submit"
          style={{ background: "#EE4622", float: "right" }}
        >
          Add Book <BiBookAdd size="24" />
        </button>
      </form>
    </div >
  );
}
