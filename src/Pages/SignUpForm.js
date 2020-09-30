import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";

export default class SignUpForm extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         name: '',
    //         email: '',
    //         phone: '',
    //         password: '',
    //         gender: '',
    //         address: '',
    //         avatar: ''
    //     }
    // }

    // handleChange = (event) => {
    //     const input = event.target;
    //     this.setState({ [input.name]: input });
    // };

    // handleFormSubmit = () => {
    //     localStorage.setItem('user', this.state);
    // };

    render() {
        return (
            <>
                <Form style={{padding: 10, paddingTop: 20, paddingBottom: 30, borderRadius: 10}}>
                    <Form.Group>
                        <h3 className="FormTitle">Sign Up</h3>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Control type="email" name="email" placeholder="Email"/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Control type="password" name="password" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicFullName">
                        <Form.Control type="text" name="name" placeholder="Full Name"/>
                    </Form.Group>
                    <Form.Group controlId="gender">
                        <Form.Control as="select" name="gender">
                            <option selected="selected" value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Control type="text" name="phone" placeholder="Phone"/>
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Control type="text" name="address" placeholder="Address"/>
                    </Form.Group>
                    <Form.Group controlId="avatar">
                        <Form.Control type="text" name="avatar" placeholder="Photo Profiles Url (Ex: http://localhost/image.jpg)"/>
                    </Form.Group>
                    <Button variant="danger" type="submit" style={{width: "100%", background: "#EE4622"}}>
                        Sign Up
                    </Button>
                </Form>
            </>
        );
    }
}