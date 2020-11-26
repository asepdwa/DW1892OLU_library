import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";

import { API } from "../../Config/Api";
import { LoginContext } from "../../Context/Login";
import LoadingScreen from "../LoadingScreen";

import ModalAlert from "../Modal/ModalAlert";
import ModalConfirm from "../Modal/ModalConfirm";

import "./Books.css";
import Book from "./Book";

export default function Books(props) {
  const [state] = useContext(LoginContext);
  const { bookmarks, status, category, author, sort, order, query } = props;

  const { loading, error, data: books, refetch } = useQuery(
    query,
    async () =>
      !bookmarks &&
      (await API.get(
        `/books?category=${category || ""}&status=${status || ""}&author=${
          author || ""
        }&sort=${sort || ""}&order=${order || ""}`
      ))
  );

  useEffect(() => {
    refetch();
  }, [bookmarks, status, category, author, sort, order, query]); // eslint-disable-line react-hooks/exhaustive-deps

  const [modalConfirmState, setModalConfirm] = useState({
    show: false,
    message: "",
    actionId: null,
  });

  const [modalAlertState, setModalAlert] = useState({
    show: false,
    message: "",
    alertType: "alert-success",
  });

  const handleDeleteConfirm = (id) => {
    setModalConfirm({
      show: true,
      message: "Are you sure want delete? ",
      actionParams: { id },
    });
  };

  const [handleDelete, { loading: deleteLoading }] = useMutation(
    async (params) => {
      try {
        const res = await API.delete(`/book/${params.id}`);

        setModalConfirm({
          ...modalConfirmState,
          show: false,
        });

        setModalAlert({
          show: true,
          message: res.data.message,
          alertType: "alert-success",
        });

        refetch();
      } catch (error) {
        setModalConfirm({
          ...modalConfirmState,
          show: false,
        });

        setModalAlert({
          show: true,
          message: error.response.message,
          alertType: "alert-danger",
        });
      }
    }
  );

  if (!bookmarks && (loading || !books)) {
    return error ? <h1>error {error.message} </h1> : <LoadingScreen />;
  } else {
    let datas = !bookmarks ? books.data.data : state.userData.bookmarks_data;

    return (
      <div className="row mt-4">
        {datas.length > 0 ? (
          datas.map((book, index) => (
            <Book
              key={index}
              data={book}
              refetch={refetch}
              profile={author ? true : false}
              handleDelete={handleDeleteConfirm}
            />
          ))
        ) : (
          <div
            style={{ width: "95%", margin: "auto", display: "block" }}
            className="alert alert-warning"
            role="alert"
          >
            <h4 className="alert-heading" style={{ textAlign: "center" }}>
              {category
                ? "Books with that category were not found"
                : bookmarks
                ? "You don't have book that added to your library"
                : author
                ? "You don't have any book"
                : "Book is not found"}
            </h4>
          </div>
        )}
        <ModalAlert modal={modalAlertState} setModal={setModalAlert} />
        <ModalConfirm
          modal={modalConfirmState}
          setModal={setModalConfirm}
          action={handleDelete}
          loadingAction={deleteLoading}
        />
      </div>
    );
  }
}
