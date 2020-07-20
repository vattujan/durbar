import React from "react";
import firebase from "../../firebase";
import PasswordReset from "../Auth/PasswordRest";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Row, Col } from "react-bootstrap";
import {
  SCHOOL_BOARD,
  ADMIN_BOARD,
  STUDENT_BOARD,
} from "../../constants/routes";
import { toast } from "react-toastify";
import { LoginImage } from "../../assets/icons";

class Login extends React.Component {
  state = {
    openModal: false,
    email: "",
    password: "",
    errors: [],
    signedInUser: "",
    loading: false,
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    this.setState({ errors: [], loading: true });
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          this.setState({ signedInUser: signedInUser });
          localStorage.setItem("currentUserUID", signedInUser.user.uid);
          var userID = signedInUser.user.uid;
          firebase
            .database()
            .ref("/users/" + userID)
            .on("value", (snapshot) => {
              snapshot.val().parentUID &&
                localStorage.setItem("parentUID", snapshot.val().parentUID);
              snapshot.val().role &&
                localStorage.setItem("currentUserRole", snapshot.val().role);
              switch (snapshot.val().role) {
                case "School":
                  this.props.history.push(SCHOOL_BOARD);
                  break;
                case "Student":
                  localStorage.setItem("student_id", snapshot.val().studentId);
                  this.props.history.push(STUDENT_BOARD);
                  break;
                case "Admin":
                  this.props.history.push(ADMIN_BOARD);
                  break;
                default:
                  break;
              }
            });
          toast.success(
            `Successfully signed in as ${signedInUser.user.email}`,
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
            }
          );
        })
        .catch((err) => {
          toast.error(err, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };
  changePassword = (event) => {
    event.preventDefault();
    this.setState({
      openModal: true,
    });
  };
  render() {
    const { email, password, errors, loading } = this.state;
    let Passwordset;
    if (this.state.openModal) {
      Passwordset = <PasswordReset email={this.state.email} />;
    }
    return (
      <>
        <Row className="m-0">
          <Col
            sm="6"
            className="d-none d-sm-block"
            style={{ backgroundColor: "#440a8e" }}
          >
            <div className="login-form">
              <h1 className="text-center text-white">
                Sign in to <b>Durbar</b>
              </h1>
              {/* <LoginImage /> */}
            </div>
          </Col>
          <Col className="bg-white" sm="6">
            <div className="login-form">
              <LoginImage />
              <Form
                className="login mb-3"
                onSubmit={this.handleSubmit}
                size="large"
              >
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    onChange={this.handleChange}
                    value={email}
                    className={this.handleInputError(errors, "email")}
                    type="email"
                  />
                </Form.Group>

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

                <Button
                  block
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
              <Button block disabled={loading} onClick={this.changePassword}>
                Forget Password?
              </Button>
              {Passwordset}
            </div>
          </Col>
        </Row>
      </>
    );
  }
}
export default Login;
