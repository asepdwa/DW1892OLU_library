import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SignInForm from "../Pages/SignInForm";
import SignUpForm from "../Pages/SignUpForm";

export default function LpButton() {
  const [SignUp, setSignUp] = useState(false);
  const [SignIn, setSignIn] = useState(false);

  const handleSignUp = () => {
    setSignUp(false);
    setSignIn(true);
  };

  return (
    <>
      <Button
        variant="danger"
        style={{ width: 200, marginRight: 10, background: "#EE4622" }}
        onClick={() => setSignUp(true)}
      >
        Sign Up
      </Button>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={SignUp}
        onHide={() => setSignUp(false)}
      >
        <Modal.Body>
          <SignUpForm Modal={handleSignUp} />
        </Modal.Body>
      </Modal>
      <Button
        variant="light"
        style={{ width: 200, marginRight: 10 }}
        onClick={() => setSignIn(true)}
      >
        Sign In
      </Button>
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={SignIn}
        onHide={() => setSignIn(false)}
      >
        <Modal.Body>
          <SignInForm />
        </Modal.Body>
      </Modal>
    </>
  );
}
