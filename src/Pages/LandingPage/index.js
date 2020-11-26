import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Header from "../../Component/Header";
import ModalButton from "../../Component/Modal/ModalButton";

import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";

import { LoginContext } from "../../Context/Login";

export default function LandingPage() {
  const [state] = useContext(LoginContext);

  const [modalSignIn, setModalSignIn] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);

  useEffect(() => {
    if (modalSignIn) setModalSignUp(false);
    else if (modalSignUp) setModalSignIn(false);
  }, [modalSignIn, modalSignUp]);

  return (
    <div className="App">
      <Header />
      <div className="container-fluid">
        <div className="left-container">
          <p className="quote">
            <i>Your</i> library
            <br />
            anywhere
          </p>
          <p className="note">
            Sign-up today and receive unlimited
            <br />
            accesss to all of your reading - shared
            <br />
            your book.
          </p>
          <br />
          {state.isLogin ? (
            <Link to="/Home">
              <button
                className="btn btn-danger"
                style={{ width: 380, background: "#EE4622" }}
              >
                Home
              </button>
            </Link>
          ) : (
            <>
              <ModalButton
                title="SignUp"
                component={SignUpForm}
                modalSize="md"
                modalState={modalSignUp}
                setModal={setModalSignUp}
                btnClassName="btn btn-danger"
                btnStyle={{
                  width: 200,
                  marginRight: 10,
                  background: "#EE4622",
                }}
              />
              <ModalButton
                title="SignIn"
                component={SignInForm}
                modalSize="sm"
                modalState={modalSignIn}
                setModal={setModalSignIn}
                btnClassName="btn btn-light"
                btnStyle={{ width: 200, marginRight: 10 }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
