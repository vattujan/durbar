import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import emailjs from "emailjs-com";
import { withRouter } from "react-router-dom";
import { LANDING } from "../../constants/routes";
import { createSchool } from "../../redux/actions/schools";
import { toast } from "react-toastify";

class CreateSchool extends Component {
  state = {
    v_school_verified: false,
    v_school_name: '',
    v_school_email: '',
    v_school_phone_number: '',
    v_school_website: '',
    v_school_registration_number: ''
  };
  handleChange = (event) => {
    event.preventDefault();
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  handleCheckChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createSchool(this.state);

    var emailData = {
      from_name: `${this.state.v_school_email}`,
      message_html: `You have new School Request from ${this.state.v_school_name}.`,
    };
    emailjs
      .send(
        "gmail",
        "template_KaBpTz7d",
        emailData,
        "user_LwWul1HxoMHszwY9OJLRz"
      )
      .then((error) => {
        console.log("FAILED...", error);
      });

    toast.success("Your Request has been sent. We will contact you soon", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
    });
    this.props.history.push(LANDING);
  };

  render() {
    const {
      v_school_name,
      v_school_email,
      v_school_phone_number,
      v_school_website,
      v_school_registration_number,
    } = this.state;
    const isdisable =
      v_school_name === "" ||
      v_school_email === "" ||
      v_school_phone_number === "" ||
      v_school_website === "" ||
      v_school_registration_number === "";

    const handleChange = this.handleChange;
    return (
      <>
        <Card>
          <Card.Header as="h5">Register School</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col md="12">
                  <Form.Group>
                    <Form.Label>Name of school</Form.Label>
                    <Form.Control
                      name="v_school_name"
                      type="text"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Short name</Form.Label>
                    <Form.Control
                      name="v_school_short_name"
                      type="text"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md="8">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="v_school_email"
                      type="email"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      name="v_school_phone_number"
                      type="number"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md="8">
                  <Form.Group>
                    <Form.Label>School's website</Form.Label>
                    <Form.Control
                      name="v_school_website"
                      type="text"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Registration number</Form.Label>
                    <Form.Control
                      name="v_school_registration_number"
                      type="number"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md="8">
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      name="v_school_address"
                      type="text"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group>
                <Form.Text className="text-muted">
                  We'll never share your details with anyone else.
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isdisable}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  v_school_name: state.v_school_name,
  v_school_short_name: state.v_school_short_name,
  v_school_email: state.v_school_email,
  v_school_website: state.v_school_website,
  v_school_phone_number: state.v_school_phone_number,
  v_school_address: state.v_school_address,
  v_school_registration_number: state.v_school_registration_number,
  v_school_verified: state.v_school_verified,
});

const mapDispatchToProps = (dispatch) => ({
  createSchool: (data) => dispatch(createSchool(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateSchool));
