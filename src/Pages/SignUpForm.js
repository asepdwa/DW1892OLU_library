import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { LoginContext } from "../Context/LoginContext";

export default function SignUpForm(props) {
  const [state, dispatch] = useContext(LoginContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "Male",
    admin: 0,
    phone: "",
    address: "",
    image: "",
  });
  const {
    email,
    password,
    name,
    gender,
    admin,
    phone,
    address,
    image,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email !== "" &&
      password !== "" &&
      name !== "" &&
      phone !== "" &&
      address !== "" &&
      image !== ""
    ) {
      dispatch({
        type: "REGISTER",
        userData: formData,
      });
      alert("Sign Up berhasil, silahkan login untuk melanjutkan....");
      props.Modal();
    } else {
      alert("Isi semua data dengan lengkap dan benar!");
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
          <h3 className="FormTitle">Sign Up</h3>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicFullName">
          <Form.Control
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Control
            as="select"
            name="gender"
            value={gender}
            onChange={(e) => handleChange(e)}
          >
            <option selected="selected" value="Male">
              Male
            </option>
            <option value="Female">Female</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="admin">
          <Form.Control
            as="select"
            name="admin"
            value={admin}
            onChange={(e) => handleChange(e)}
          >
            <option selected="selected" value="0">
              Guest
            </option>
            <option value="1">Admin</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Control
            type="text"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Control
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Control
            type="text"
            name="image"
            placeholder="Photo Profiles Url (Ex: http://localhost/image.jpg)"
            value={image}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Button
          variant="danger"
          type="submit"
          style={{ width: "100%", background: "#EE4622" }}
        >
          Sign Up
        </Button>
      </Form>
    </>
  );
}
