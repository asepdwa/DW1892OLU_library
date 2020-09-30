import React from 'react';
import { Button, Form } from "react-bootstrap";

export default function SignIn() {
    return (
        <>
            <Form style={{padding: 10, paddingTop: 20, paddingBottom: 30, borderRadius: 10}}>
                <Form.Group>
                    <h3 className="FormTitle">Sign In</h3>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" style={{paddingBottom: 15}}>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="danger" type="submit" style={{width: "100%", background: "#EE4622"}}>
                    Sign In
                </Button>
            </Form>
        </>
    );
}
    