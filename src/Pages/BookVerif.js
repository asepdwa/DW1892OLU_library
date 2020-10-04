import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { BookContext } from "../Context/BookContext";
import { FcApproval } from "react-icons/fc";

export default function AddBook() {
  const [state, dispatch] = useContext(BookContext);
  const history = useHistory();
  let userData_Saved = localStorage.getItem("loginData")
    ? JSON.parse(localStorage.getItem("loginData"))
    : [];

  if (userData_Saved.role !== "Admin") {
    history.push("/Home");
  }

  return (
    <div className="table-responsive">
      <h4 className="list-title" style={{ padding: 0 }}>
        Book Verification
      </h4>
      <table className="table table-hovered table-striped table-sm mt-4">
        <thead>
          <tr>
            <th>No</th>
            <th>Users or Author</th>
            <th>ISBN</th>
            <th>E-book</th>
            <th>Status</th>
            <th>
              <center>Action</center>
            </th>
          </tr>
        </thead>
        <tbody>
          {state.bookData.map((book, index) => (
            <tr>
              <td>{book.id}</td>
              <td>{book.user}</td>
              <td>{book.isbn}</td>
              <td style={{ fontSize: 12, fontWeight: 700 }}>
                <Link to="/Read">
                  {book.source.split("/")[book.source.split("/").length - 1]}
                </Link>
              </td>
              {book.status === "Approved" ? (
                <>
                  <td
                    className="text-success"
                    style={{ fontSize: 12, fontWeight: 700 }}
                  >
                    {book.status}
                  </td>
                  <td>
                    <center>
                      <FcApproval size="30" />
                    </center>
                  </td>
                </>
              ) : (
                <>
                  <td
                    className="text-danger"
                    style={{ fontSize: 12, fontWeight: 700 }}
                  >
                    {book.status}
                  </td>
                  <td>
                    <center>
                      {book.status !== "Canceled" && (
                        <button
                          onClick={() =>
                            dispatch({
                              type: "VERIFICATION",
                              bookLoad: {
                                id: book.id,
                                status: "Canceled",
                              },
                            })
                          }
                          className="btn btn-danger"
                        >
                          Cancel
                        </button>
                      )}{" "}
                      <button
                        onClick={() =>
                          dispatch({
                            type: "VERIFICATION",
                            bookLoad: {
                              id: book.id,
                              status: "Approved",
                            },
                          })
                        }
                        className="btn btn-success"
                      >
                        Approve
                      </button>
                    </center>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
