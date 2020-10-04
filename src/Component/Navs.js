import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BiBookmarks } from "react-icons/bi";
import { MdLibraryBooks, MdLibraryAdd } from "react-icons/md";
import { LoginContext } from "../Context/LoginContext";

export default function Navs(props) {
  // eslint-disable-next-line
  const [state, dispatch] = useContext(LoginContext);
  const match = useRouteMatch();

  let userData_Saved = localStorage.getItem("loginData")
    ? JSON.parse(localStorage.getItem("loginData"))
    : [];

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    alert("Logout berhasil");
  };
  return (
    <div className="Profile">
      <img src={userData_Saved.image} alt="icon" />
      <p>{userData_Saved.name}</p>
      <i>( {userData_Saved.role} )</i>
      <hr />
      <Link to={`${match.url}/Profile`}>
        <button>
          <FiUser /> My Profile
        </button>
      </Link>
      <Link to={`${match.url}/MyLibrary`}>
        <button>
          <MdLibraryBooks /> My Library
        </button>
      </Link>
      <Link to={`${match.url}/AddBook`}>
        <button>
          <MdLibraryAdd /> Add Book
        </button>
      </Link>
      {userData_Saved.role === "Admin" && (
        <>
          <Link to={`${match.url}/BookVerif`}>
            <button style={{ fontSize: 22 }}>
              <BiBookmarks /> Book Verification
            </button>
          </Link>
        </>
      )}
      <hr />
      <button onClick={handleLogout}>
        <FiLogOut /> Logout
      </button>
    </div>
  );
}
