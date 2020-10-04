import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaTransgender, FaPhoneAlt } from "react-icons/fa";
import { ImLocation } from "react-icons/im";

import { BookContext } from "../Context/BookContext";

export default function Profile() {
  let userData_Saved = localStorage.getItem("loginData")
    ? JSON.parse(localStorage.getItem("loginData"))
    : [];

  const [state] = useContext(BookContext);

  return (
    <>
      <div className="ProfileBox">
        <div className="row">
          <div className="col-sm-8" style={{ paddingLeft: 30 }}>
            <div className="Profilee">
              <MdEmail size="30" fill="#8A8C90" style={{ marginTop: 10 }} />
              <div className="ProfileRow">
                <p className="profile-data">{userData_Saved.email}</p>
                <p className="profile-note">E-mail</p>
              </div>
            </div>
            <div className="Profilee">
              <FaTransgender
                size="30"
                fill="#8A8C90"
                style={{ marginTop: 10 }}
              />
              <div className="ProfileRow">
                <p className="profile-data">{userData_Saved.gender}</p>
                <p className="profile-note">Gender</p>
              </div>
            </div>
            <div className="Profilee">
              <FaPhoneAlt size="30" fill="#8A8C90" style={{ marginTop: 10 }} />
              <div className="ProfileRow">
                <p className="profile-data">{userData_Saved.phone}</p>
                <p className="profile-note">Phone</p>
              </div>
            </div>
            <div className="Profilee">
              <ImLocation size="30" fill="#8A8C90" style={{ marginTop: 10 }} />
              <div className="ProfileRow">
                <p className="profile-data">{userData_Saved.address}</p>
                <p className="profile-note">Address</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <img
              src={userData_Saved.image}
              alt="icon"
              style={{
                width: "60%",
                height: "auto",
                margin: "auto",
                display: "block",
              }}
            />
            <button className="btn-custom">Change Photo Profile</button>
          </div>
        </div>
      </div>
      <h4 className="list-title mt-4">My Book</h4>
      <div className="row mt-4">
        {state.bookData
          .filter((book) => book.user === userData_Saved.name)
          .map((book, index) => (
            <div className="col-sm-3">
              {book.status !== "Approved" && (
                <div className="need-confirm">
                  <p>{book.status}</p>
                </div>
              )}
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
    </>
  );
}
