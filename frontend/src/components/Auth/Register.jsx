import React from "react";
import firebase from "../../firebase";
import md5 from "md5";
import { withRouter } from "react-router-dom";
import { Card, Button, Alert, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ADMIN_BOARD, SCHOOL_BOARD } from "../../constants/routes";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    emailVarified: false,
    passwordConfirmation: "",
    studentId: "",
    studentClass: "",
    semester: "",
    errors: [],
    loading: false,
    createdUser: "",
    usersRef: firebase.database().ref("users"),
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({
    username,
    email,
    password,
    passwordConfirmation,
    studentId,
    studentClass,
    semester,
  }) => {
    if (localStorage.getItem("currentUserRole") === "Admin") {
      return (
        !username.length ||
        !email.length ||
        !password.length ||
        !passwordConfirmation.length
      );
    } else {
      return (
        !username.length ||
        !email.length ||
        !password.length ||
        !passwordConfirmation.length ||
        !studentId.length ||
        !studentClass.length ||
        !semester.length
      );
    }
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                switch (localStorage.getItem("currentUserRole")) {
                  case "Admin":
                    this.props.history.push(ADMIN_BOARD);
                    break;
                  case "School":
                    this.props.history.push(SCHOOL_BOARD);
                    break;
                  default:
                    break;
                }
              });
              toast.success(
                `Successfully registered school as ${createdUser.user.email}`,
                {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                }
              );
            })
            .catch((err) => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false,
              });
            });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
          console.log(err);
        });
    }
  };

  saveUser = (createdUser) => {
    if (localStorage.getItem("currentUserRole") === "Admin") {
      return this.state.usersRef.child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL,
        role: "School",
        parentUID: localStorage.getItem("currentUserUID"),
      });
    } else if (localStorage.getItem("currentUserRole") === "School") {
      return this.state.usersRef.child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL,
        role: "Student",
        parentUID: localStorage.getItem("currentUserUID"),
        studentId: this.state.studentId,
        studentClass: this.state.studentClass,
        semester: this.state.semester,
      });
    } else {
      return false;
    }
  };
  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      studentId,
      studentClass,
      semester,
      errors,
      loading,
    } = this.state;
    return (
      <Card>
        {localStorage.getItem("currentUserRole") === "Admin" && (
          <Card.Header as="h5">Add a school</Card.Header>
        )}
        {localStorage.getItem("currentUserRole") === "School" && (
          <Card.Header as="h5">Add a student</Card.Header>
        )}
        {localStorage.getItem("currentUserRole") === "Student" && (
          <Card.Header as="h5">You cannot add a user</Card.Header>
        )}
        {!localStorage.getItem("currentUserRole") && (
          <Card.Header as="h5">You cannot add a user</Card.Header>
        )}
        <Card.Body>
          <Form onSubmit={this.handleSubmit} size="large">
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    onChange={this.handleChange}
                    value={username}
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    name="email"
                    onChange={this.handleChange}
                    value={email}
                    className={this.handleInputError(errors, "email")}
                    type="email"
                  />
                </Form.Group>
              </Col>
            </Row>
            {localStorage.getItem("currentUserRole") === "School" && (
              <>
                <Form.Group>
                  <Form.Label>Student's Id</Form.Label>
                  <Form.Control
                    name="studentId"
                    onChange={this.handleChange}
                    value={studentId}
                    type="number"
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Student's class</Form.Label>
                      <Form.Control
                        name="studentClass"
                        onChange={this.handleChange}
                        value={studentClass}
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Student's semester</Form.Label>
                      <Form.Control
                        name="semester"
                        onChange={this.handleChange}
                        value={semester}
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    onChange={this.handleChange}
                    value={password}
                    className={this.handleInputError(errors, "password")}
                    type="password"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    name="passwordConfirmation"
                    onChange={this.handleChange}
                    value={passwordConfirmation}
                    className={this.handleInputError(errors, "password")}
                    type="password"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                  />
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
          {errors.length > 0 && (
            <Alert error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Alert>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Register);
