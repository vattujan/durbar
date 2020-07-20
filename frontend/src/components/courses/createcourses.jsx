import React, { Component } from "react";
import { Card, Button,Form } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { createCourses } from "../../redux/actions/courses";
import { SCHOOL_BOARD } from "../../constants/routes";

class CreateCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      v_course_semester: "",
      v_course_class: "",
      v_course_parentuid: "",
      v_course_title: "",
      v_course_description: "",
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  componentDidMount() {
    if (localStorage.getItem("currentUserUID")) {
      this.setState({
        v_course_parentuid: localStorage.getItem("currentUserUID"),
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createCourses(this.state).then(() => {
      toast.success(`Course has been successfully added`, {
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
      v_course_semester,
      v_course_description,
      v_course_title,
    } = this.state;
    const isDisable =
      v_course_semester === "" ||
      v_course_title === "" ||
      v_course_description === "";
    return (
      <>
        <Card>
          <Card.Header as="h5">Add Course</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Courses title</Form.Label>
                <Form.Control
                  name="v_course_title"
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Courses description</Form.Label>
                <Form.Control
                  name="v_course_description"
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Class</Form.Label>
                <Form.Control
                  name="v_course_class"
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Semester</Form.Label>
                <Form.Control
                  name="v_course_semester"
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isDisable}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}

CreateCourses.protoTypes = {
  createCourses: PropTypes.func.isRequired,
};
export default withRouter(connect(null, { createCourses })(CreateCourses));
