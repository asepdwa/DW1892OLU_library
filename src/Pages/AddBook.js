import React, { useContext, useState } from "react";
import { API } from "../Config/Api";
import { useMutation } from "react-query";
import { BiBookAdd } from "react-icons/bi";
import { FaPaperclip, FaRegFileImage } from "react-icons/fa"
import { LoginContext } from "../Context/LoginContext";

export default function AddBook() {
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
      title.length > 3 &&
      category.length > 3 &&
      publication.length > 3 &&
      pages.length > 0 &&
      aboutBook.length > 10 &&
      isbn.length > 3
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

        const res = await API.post("/book", body, config);
        alert(res.data.message);
        setFormData({
          title: "",
          publication: "",
          category: "",
          pages: "",
          isbn: "",
          aboutBook: "",
        });
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
            value={title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="publication"
            value={publication}
            placeholder="Publication Date"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="category"
            value={category}
            placeholder="Category"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="pages"
            value={pages}
            placeholder="Pages"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="isbn"
            value={isbn}
            placeholder="ISBN"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            name="aboutBook"
            value={aboutBook}
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
