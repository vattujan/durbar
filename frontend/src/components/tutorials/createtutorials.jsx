import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCourses } from "../../redux/actions/courses";
import { createTutorials } from "../../redux/actions/tutorial";
import { SCHOOL_BOARD } from "../../constants/routes";
import { toast } from "react-toastify";

class Createtutorials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_title: "",
      tutorial_docs: null,
      tutorial_parentuid: "",
    };
  }
  componentDidMount() {
    let id = localStorage.getItem("currentUserUID");
    this.props.getCourses();
    this.setState({ tutorial_parentuid: id });
  }
  handleChange = (event) => {
    event.preventDefault();
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("course_title", this.state.course_title);
    data.append("tutorial_parentuid", this.state.tutorial_parentuid);
    for (let i = 0; i < this.state.tutorial_docs.length; i++) {
      data.append("tutorial_docs", this.state.tutorial_docs[i]);
    }
    this.props.createTutorials(data);
    toast.success("Successfullt added tutorial", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
    });
    this.props.history.push(SCHOOL_BOARD);
  };
  multipleFileChangedHandler = (e) => {
    e.preventDefault();
    this.setState({
      tutorial_docs: e.target.files,
    });
  };
  render() {
    const uid = localStorage.getItem("currentUserUID");
    return (
      <Card>
        <Card.Header as="h5">Add tutorials</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                as="select"
                name="course_title"
                onChange={this.handleChange}
              >
                <option>Choose Courses _ _ _</option>
                {this.props.courses.map(
                  (n) =>
                    n.course_parentuid === uid && (
                      <option key={n.course_id} value={n.course_title}>
                        {n.course_title}
                      </option>
                    )
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Upload Tutorials</Form.Label>
              <Form.Control
                onChange={this.multipleFileChangedHandler}
                name="tutorial_docs"
                type="file"
                multiple
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  courses: state.courses,
});
const mapDispatchToProps = (dispatch) => ({
  getCourses: () => dispatch(getCourses()),
  createTutorials: (data) => dispatch(createTutorials(data)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Createtutorials)
);
