import React, { useState } from "react";
import { useMutation } from "react-query"
import { Button, Form } from "react-bootstrap";

import { API } from "../Config/Api"

export default function SignUpForm(props) {
  // eslint-disable-next-line
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "Male",
    phone: "",
    address: "",
    avatar: null,
  });

  const {
    email,
    password,
    name,
    gender,
    phone,
    address,
    avatar,
  } = formData;

  const handleChange = (e) => {
    e.target.type === "file"
      ? setFormData({ ...formData, [e.target.name]: e.target.files[0] })
      : setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [handleSubmit] = useMutation(async () => {
    if (
      email.length > 4 &&
      password.length > 4 &&
      name.length > 4 &&
      phone.length > 4 &&
      address.length > 4
    ) {
      try {
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        let body = new FormData();
        body.append("email", email);
        body.append("password", password);
        body.append("fullName", name);
        body.append("gender", gender);
        body.append("phone", phone);
        body.append("address", address);
        body.append("avatar", avatar);
        body.append("role", "Guest");

        const res = await API.post("/signup", body, config)
        alert(res.data.message);
        props.Modal();
      } catch (error) {
        alert(error.response.data.error.message)
      }
    } else {
      alert("Fill in the form correctly ...");
    }
  });

  return (
    <>
      <Form
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 30,
          borderRadius: 10,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
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
        <Form.Group controlId="avatar">
          <Form.File
            id="custom-file"
            name="avatar"
            label={!avatar ? "Choose your photo profile" : avatar.name}
            onChange={(e) => handleChange(e)}
            accept="image/*"
            custom
          />
        </Form.Group>
        <Button
          variant="danger"
          type="submit"
          style={{ width: "100%", background: "#EE4622" }}
        >
          Sign Up
        </Button>
        <p className="modalFooter">
          Already have an account ? <b onClick={props.Modal}>Click Here</b>
        </p>
      </Form>
    </>
  );
}
