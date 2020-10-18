import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { API } from "../Config/Api";
import { useQuery } from "react-query";
import { FaRegBookmark, FaBookOpen, FaTrashAlt } from "react-icons/fa";
import { useParams, useHistory, Link } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import LoadingScreen from "./LoadingScreen";

export default function Detail() {
  const [state, dispatch] = useContext(LoginContext);
  const [modalState, setModal] = useState({ show: false, message: "", alertType: "alert-success" });

  const history = useHistory();
  const { id } = useParams();

  const { loading, error, data: book } = useQuery(
    "getBookDetail",
    async () => await API.get(`/book/${id}`)
  );

  if (id === null || id === undefined)
    return history.push("/Home");

  const AddToMyLibrary = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ UserId: state.userData.id, BookId: parseInt(id) });
      const res = await API.post("/bookmark", body, config);

      try {
        const resAuth = await API.get("/auth");

        dispatch({
          type: "LOAD_USER",
          payload: resAuth.data.data,
        });

      } catch (error) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
      setModal({ show: true, message: res.data.message, alertType: "alert-success" })
    } catch (err) {
      setModal({ show: true, message: err.response.data.message, alertType: "alert-danger" })
    }
  };

  const removeFromMyLibrary = async () => {
    try {
      const res = await API.delete(`/bookmark/${state.userData.id}/${parseInt(id)}`);

      try {
        const resAuth = await API.get("/auth");

        dispatch({
          type: "LOAD_USER",
          payload: resAuth.data.data,
        });

      } catch (error) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }

      setModal({ show: true, message: res.data.message, alertType: "alert-warning" })
    } catch (err) {
      setModal({ show: true, message: err.response.data.message, alertType: "alert-danger" })
    }
  };

  if (loading || !book) {
    return error ? (
      <h1>error {error.message} </h1>
    ) : <LoadingScreen />;
  } else {
    return error ? (
      <h1>error {error.message} </h1>
    ) : (
        <div className="container">
          <div className="row">
            <div className="col-sm-5">
              <img
                src={book.data.data.thumbnailUrl}
                style={{
                  width: "85%",
                  height: "auto",
                  margin: "auto",
                  display: "block",
                }}
                alt={book.data.data.title}
              />
            </div>
            <div className="col-sm-7">
              <h3 contenteditable="true"
                style={{
                  fontSize: 50,
                  fontFamily: "Times New Roman",
                  fontWeight: 750,
                }}
              >
                {book.data.data.title}
                {" "}
              </h3>

              <p className="detail-data" style={{ fontSize: 18 }}>
                {book.data.data.author.fullName}
              </p>
              <p className="detail-type">Publication Date</p>
              <p className="detail-data">{book.data.data.publication}</p>
              <p className="detail-type">Category</p>
              <p className="detail-data">{book.data.data.category.name}</p>
              <p className="detail-type">Pages</p>
              <p className="detail-data">{book.data.data.pages}</p>
              <p className="detail-type" style={{ color: "#ee4622" }}>
                ISBN
            </p>
              <p className="detail-data">{book.data.data.isbn}</p>
            </div>
          </div>
          <hr
            style={{
              border: "1px solid #c9c9c9",
              marginBottom: 40,
              marginTop: 30,
            }}
          />
          <div className="container">
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
              {book.data.data.aboutBook}
            </p>
            <br />
            <div
              className="mb-4"
              style={{ display: "flex", flexDiretion: "column", float: "right" }}
            >
              {state.userData.bookmarks_data.some((bookmark) => bookmark.id === parseInt(id)) ? (
                <button
                  className="btn-custom"
                  style={{ width: 190, marginTop: 0, marginRight: 10 }}
                  onClick={() => removeFromMyLibrary()}
                >
                  Remove From Library <FaTrashAlt />
                </button>
              ) : <button
                className="btn-custom"
                style={{ width: 120, marginTop: 0, marginRight: 10 }}
                onClick={() => AddToMyLibrary()}
              >
                  Add Library <FaRegBookmark />
                </button>}
              <Link to={`/Read/${book.data.data.id}`}>
                <button className="btn btn-light" style={{ height: 40 }}>
                  Read Book <FaBookOpen />
                </button>
              </Link>
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalState.show}
                onHide={() => setModal({ ...modalState, show: false })}
              >
                <div
                  className={`alert ${modalState.alertType}`}
                  style={{ margin: 10, textAlign: "center" }}
                >
                  {modalState.message}
                </div>
              </Modal>

            </div>
          </div>
        </div>
      );
  }
}
