import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { COURSES } from "../../constants/routes";
import { editCourse } from "../../redux/actions/courses";
import { getCoursesDetail } from "../../redux/actions/courses";

class EditCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      v_course_id: "",
      v_course_semester: "",
      v_course_class: "",
      v_course_title: "",
      v_course_description: "",
    };
  }
  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getCoursesDetail(id).then(() =>
      this.props.detailcourses.map((dc) =>
        this.setState({
          v_course_id: dc.course_id,
          v_course_title: dc.course_title,
          v_course_description: dc.course_description,
          v_course_class: dc.course_class,
          v_course_semester: dc.course_semester,
        })
      )
    );
  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.editCourse(this.state).then(() => {
      toast.success(`Course has been successfully edited`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      this.props.history.push(COURSES);
    });
  };
  render() {
    return (
      <>
        <Card>
          <Card.Header as="h5">Edit Course</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Courses title</Form.Label>
                <Form.Control
                  name="v_course_title"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.v_course_title}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Courses description</Form.Label>
                <Form.Control
                  name="v_course_description"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.v_course_description}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Class</Form.Label>
                <Form.Control
                  name="v_course_class"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.v_course_class}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Semester</Form.Label>
                <Form.Control
                  name="v_course_semester"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.v_course_semester}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
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
  detailcourses: state.detailcourses,
});
const mapDispatchToProps = (dispatch) => ({
  editCourse: (data) => dispatch(editCourse(data)),
  getCoursesDetail: (id) => dispatch(getCoursesDetail(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditCourse)
);
