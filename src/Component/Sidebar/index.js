import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BsBookmarkCheck } from "react-icons/bs";
import { MdLibraryBooks, MdLibraryAdd } from "react-icons/md";
import { LoginContext } from "../../Context/Login";

export default function Sidebar() {
  // eslint-disable-next-line
  const [state, dispatch] = useContext(LoginContext);
  const history = useHistory();
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    alert("Logout berhasil");
    history.push("/");
  };

  return (
    <div className="Profile">
      <img src={state.userData.photoUrl} alt="icon" />
      <p>{state.userData.fullName}</p>
      <div className="role">{state.userData.role}</div>
      <hr />
      <Link to="/Profile">
        <button>
          <FiUser /> My Profile
        </button>
      </Link>
      <Link to="/MyLibrary">
        <button>
          <MdLibraryBooks /> My Library
        </button>
      </Link>
      <Link to="/Add">
        <button>
          <MdLibraryAdd /> Add Book
        </button>
      </Link>
      {state.userData.role === "Admin" && (
        <Link to="/Verification">
          <button style={{ fontSize: 22 }}>
            <BsBookmarkCheck size="25" /> Book Verification
          </button>
        </Link>
      )}
      <hr />
      <button onClick={handleLogout}>
        <FiLogOut /> Logout
      </button>
    </div>
  );
}
