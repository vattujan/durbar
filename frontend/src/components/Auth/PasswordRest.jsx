import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import firebase from "../../firebase";

const INITIAL_STATE = {
  email: "",
  error: null,
  isLinkSent: false,
};

class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const auth = firebase.auth();
    const { email } = this.state;
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.setState({ isLinkSent: true });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, error, isLinkSent } = this.state;
    const isInvalid = email === "";
    let message1;
    if (isLinkSent) {
      message1 = (
        <p>Please follow the information in email to reset you password</p>
      );
    }
    return (
      <>
        <Form className="password-reset" onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="email"
              onChange={this.onChange}
              name="email"
              value={this.state.email}
            />
          </Form.Group>
          <Button block disabled={isInvalid} type="submit">
            Reset My Password
          </Button>
          {error && <p>{error.message}</p>}
          {message1}
        </Form>
      </>
    );
  }
}

export default PasswordReset;
