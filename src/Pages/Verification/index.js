import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useQuery, useMutation } from "react-query";
import { Dropdown, DropdownButton } from "react-bootstrap";

import { API } from "../../Config/Api";

import ModalAlert from "../../Component/Modal/ModalAlert";
import ModalConfirm from "../../Component/Modal/ModalConfirm";
import LoadingScreen from "../../Component/LoadingScreen";

const filterDropdown = ["Approved", "Canceled", "Waiting to be verified"];
const blankTable = [
  "1",
  "None",
  "None",
  "None",
  "None",
  <center>None</center>,
  <center>None</center>,
];

export default function Verification() {
  const [filterStatus, setFilterStatus] = useState("");
  const { isLoading, error, data: books, refetch, isFetching } = useQuery(
    "getBooksData",
    async () => await API.get(`/books?status=${filterStatus}`)
  );

  const [modalConfirmState, setModalConfirm] = useState({
    show: false,
    message: null,
    actionParams: null,
  });

  const [modalState, setModal] = useState({
    show: false,
    message: "",
    alertType: "alert-success",
  });

  const handleActionConfirm = ({ id, action, message, status }) => {
    setModalConfirm({
      show: true,
      message,
      actionParams: { id, action, status },
    });
  };

  const [handleAction, { isLoading: actionLoading }] = useMutation(
    async (params) => {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };

        const body = JSON.stringify({ status: params.status });
        const res =
          params.action === "patch"
            ? await API.patch(`/book/${params.id}`, body, config)
            : await API.delete(`/book/${params.id}`);

        setModal({
          show: true,
          message: res.data.message,
          alertType: "alert-success",
        });

        refetch();
        setModalConfirm({ ...modalConfirmState, show: false });
      } catch (error) {
        setModalConfirm({ ...modalConfirmState, show: false });
        setModal({
          show: true,
          message: error.response.data.message,
          alertType: "alert-danger",
        });
      }
    }
  );

  useEffect(() => {
    refetch();
  }, [filterStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || !books) {
    return error ? <h1>error {error.message} </h1> : <LoadingScreen />;
  } else {
    let datas = books.data.data;

    return (
      <>
        <div className="row">
          <div className="col-8">
            <h4 className="list-title">Books Verification</h4>
          </div>

          <div className="col-4">
            <div className="float-right">
              <DropdownButton
                variant="secondary"
                id={`dropdown-variants-secondary`}
                title={
                  "Filter Status: " +
                  (filterStatus === "" ? "All" : filterStatus)
                }
              >
                <Dropdown.Header>Select filter status</Dropdown.Header>
                <Dropdown.Item
                  onClick={() => {
                    setFilterStatus("");
                  }}
                  {...(filterStatus === "" ? { active: true } : {})}
                >
                  All
                </Dropdown.Item>
                {filterDropdown.map((filter, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      setFilterStatus(filter);
                    }}
                    {...(filter === filterStatus ? { active: true } : {})}
                  >
                    {filter}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          </div>
        </div>
        {isFetching ? (
          <LoadingScreen />
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-md mt-4">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Book</th>
                  <th>Status</th>
                  <th>
                    <center>Action</center>
                  </th>
                  <th>
                    <center>Delete</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.length > 0 ? (
                  datas.map((book, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{book.author.fullName}</td>
                      <td>{book.isbn}</td>
                      <td style={{ fontSize: 12, fontWeight: 700 }}>
                        <Link to={`/Detail/${book.id}`}>
                          {book.fileUrl
                            .split("/")
                            [book.fileUrl.split("/").length - 1].substring(
                              0,
                              40
                            )}
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
                              <button
                                onClick={() =>
                                  handleActionConfirm({
                                    id: book.id,
                                    action: "patch",
                                    status: "Waiting to be verified",
                                    message: "Are you sure want to reset ?",
                                  })
                                }
                                className="btn btn-light"
                              >
                                Reset
                              </button>
                            </center>
                          </td>
                        </>
                      ) : (
                        <>
                          <td
                            className={
                              book.status === "Canceled"
                                ? "text-danger"
                                : "text-warning"
                            }
                            style={{ fontSize: 12, fontWeight: 700 }}
                          >
                            {book.status}
                          </td>
                          <td>
                            <center>
                              {book.status !== "Canceled" && (
                                <button
                                  onClick={() =>
                                    handleActionConfirm({
                                      id: book.id,
                                      action: "patch",
                                      status: "Canceled",
                                      message: "Are you sure want to cancel ?",
                                    })
                                  }
                                  className="btn btn-danger"
                                >
                                  Cancel
                                </button>
                              )}{" "}
                              <button
                                onClick={() =>
                                  handleActionConfirm({
                                    id: book.id,
                                    action: "patch",
                                    status: "Approved",
                                    message: "Are you sure want to approve ?",
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
                      <td>
                        <center>
                          <button
                            onClick={() =>
                              handleActionConfirm({
                                id: book.id,
                                action: "remove",
                                message: "Are you sure want to remove ?",
                              })
                            }
                            className="btn btn-secondary"
                          >
                            <FaTrashAlt />
                          </button>
                        </center>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    {blankTable.map((data, index) => (
                      <td>{data}</td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <ModalAlert modal={modalState} setModal={setModal} />
        <ModalConfirm
          modal={modalConfirmState}
          setModal={setModalConfirm}
          action={handleAction}
          loadingAction={actionLoading}
        />
      </>
    );
  }
}
