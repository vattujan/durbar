import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { createStudent } from "../../redux/actions/students";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { SCHOOL_BOARD } from "../../constants/routes";

class Createrecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examination_date: "",
      student_id: "",
      course: "",
      exam_type: "",
      scores: "",
      remarks: "",
      errors: [],
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    let nam = event.target.name;
    let value = event.target.value;
    this.setState({ [nam]: value });
  };
  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);
  onChange = (examination_date) => this.setState({ examination_date });

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createStudent(this.state).then(() => {
      toast.success("New record has been Successfully added", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      this.props.history.push(SCHOOL_BOARD);
    });
  };
  render() {
    const {
      examination_date,
      student_id,
      course,
      exam_type,
      scores,
      remarks,
      errors,
    } = this.state;
    const isInvalid =
      examination_date === "" ||
      student_id === "" ||
      course === "" ||
      exam_type === "" ||
      scores === "" ||
      remarks === "";
    return (
      <>
        <Card>
          <Card.Header as="h5">Add Student Records</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Examination Date</Form.Label>
                <br />
                <DatePicker
                  className="examination_date_entry"
                  name="examination_date"
                  placeholderText="Click to select a date"
                  type="text"
                  onChange={this.onChange}
                  selected={this.state.examination_date}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Student Id</Form.Label>
                <Form.Control
                  name="student_id"
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Course</Form.Label>
                <Form.Control
                  name="course"
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Exam Type</Form.Label>
                <Form.Control
                  name="exam_type"
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Scores</Form.Label>
                <Form.Control
                  name="scores"
                  type="number"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  name="remarks"
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isInvalid}>
                Submit
              </Button>
              {errors.length > 0 && (
                <Alert>
                  <h3>error</h3>
                  {this.displayErrors(errors)}
                </Alert>
              )}
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}
Createrecords.protoTypes = {
  createStudent: PropTypes.func.isRequired,
};
export default connect(null, { createStudent })(Createrecords);
