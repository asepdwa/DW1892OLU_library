import React, { useContext, useState } from "react";
import { LoginContext } from "../Context/LoginContext";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function SignIn() {
  const history = useHistory();
  const [state, dispatch] = useContext(LoginContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  let userData_Saved = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filterExistedUserData = state.userData.filter(
    (userData) => userData.email === email && userData.password === password
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (email === userData_Saved.email &&
        password === userData_Saved.password) ||
      filterExistedUserData.length > 0
    ) {
      dispatch({
        type: "LOGIN",
        loginData: filterExistedUserData[0],
      });

      alert("Login Berhasil");
      history.push("/Home");
    } else {
      alert("Email atau password yang dimasukkan salah");
    }
  };

  return (
    <>
      <Form
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 30,
          borderRadius: 10,
        }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Form.Group>
          <h3 className="FormTitle">Sign In</h3>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" style={{ paddingBottom: 15 }}>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Button
          variant="danger"
          type="submit"
          style={{ width: "100%", background: "#EE4622" }}
        >
          Sign In
        </Button>
      </Form>
    </>
  );
}
