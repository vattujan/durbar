import React from "react";
import firebase from "../../firebase";
import md5 from "md5";
import { withRouter } from "react-router-dom";
import { Card, Button, Alert, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ADMIN_BOARD, SCHOOL_BOARD } from "../../constants/routes";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";

class CreateStaffs extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        phonenumber: "",
        passwordConfirmation: "",
        designation: "",
        address: "",
        errors: [],
        loading: false,
        createdUser: "",
        staffRef: firebase.database().ref("staffs"),
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
    }) => {
        return (
            !username.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        );
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
        return this.state.staffRef.child(createdUser.user.uid).set({
            username: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
            address: this.state.address,
            designation: this.state.designation,
            phonenumber: this.state.phonenumber

        });

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
            designation,
            phonenumber,
            username,
            address,
            email,
            password,
            passwordConfirmation,
            errors,
            loading,
        } = this.state;
        return (
            <Card>
                <Card.Header>Teacher Registration Form</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Row>
                            <Col md="12">
                                <Form.Group>
                                    <Form.Label>Full name</Form.Label>
                                    <Form.Control
                                        name="username"
                                        onChange={this.handleChange}
                                        value={username}
                                        type="text"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md="6">
                                <Form.Group>
                                    <Form.Label>Faculty</Form.Label>
                                    <Form.Control
                                        name="designation"
                                        onChange={this.handleChange}
                                        value={designation}
                                        type="text"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        onChange={this.handleChange}
                                        value={email}
                                        className={this.handleInputError(errors, "email")}
                                        type="email"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        name="phonenumber"
                                        onChange={this.handleChange}
                                        value={phonenumber}
                                        className={this.handleInputError(errors, "email")}
                                        type="number"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        name="address"
                                        onChange={this.handleChange}
                                        value={address}
                                        className={this.handleInputError(errors, "email")}
                                        type="text"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

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

export default withRouter(CreateStaffs);
