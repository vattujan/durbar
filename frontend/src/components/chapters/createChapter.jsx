import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { withRouter, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createChapter } from "../../redux/actions/chapters";
import { getCoursesByUserId } from "../../redux/actions/courses";
import { COURSES } from "../../constants/routes";
import RedStar from "../component/redStar";

class CreateChapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      v_chapter_title: "",
      v_chapter_topics: "",
      v_chapter_resource: "",
      v_chapter_exercise: "",
      v_chapter_files: null,
      v_course_id: this.props.match.params.id,
    };
    const useruid = localStorage.getItem("currentUserUID");
    this.props.getCoursesByUserId(useruid);
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
    data.append("v_chapter_title", this.state.v_chapter_title);
    data.append("v_chapter_topics", this.state.v_chapter_topics);
    data.append("v_chapter_resource", this.state.v_chapter_resource);
    data.append("v_chapter_exercise", this.state.v_chapter_exercise);
    for (let i = 0; i < this.state.v_chapter_files.length; i++) {
      data.append("v_chapter_files", this.state.v_chapter_files[i]);
    }
    data.append("v_course_id", this.state.v_course_id);
    this.props.createChapter(data).then(() => {
      toast.success(`Chapter has been successfully added`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      this.props.history.push(COURSES);
    });
  };

  multipleFileChangedHandler = (e) => {
    e.preventDefault();
    this.setState({
      v_chapter_files: e.target.files,
    });
  };

  render() {
    const {
      v_chapter_title,
      v_chapter_topics,
      v_chapter_resource,
      v_course_id,
    } = this.state;
    const course = this.props.courses
      .filter((c) => c.course_id.toString() === v_course_id)
      .map((c) => <b key={c.course_id}>{c.course_title}</b>);
    const isDisable =
      v_chapter_title === "" ||
      v_chapter_topics === "" ||
      v_chapter_resource === "" ||
      v_course_id === "" ||
      !course.length;
    return (
      <>
        <Card>
          <Card.Header as="h5">Add Chapter</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              {course.length ? (
                <p className="text-success">
                  You are adding a new chapter for {course}
                </p>
              ) : (
                <p className="text-danger">
                  You have not selected a valid course. See all available{" "}
                  <Link to="/courses">courses</Link>
                </p>
              )}
              <Form.Group>
                <Form.Label>Chapter title</Form.Label>
                <RedStar />
                <Form.Control
                  name="v_chapter_title"
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Chapter topics</Form.Label>
                <RedStar />
                <CKEditor
                  name="v_chapter_topics"
                  editor={ClassicEditor}
                  data={this.state.v_chapter_topics}
                  onChange={(event, editor) => {
                    this.setState({ v_chapter_topics: editor.getData() });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Chapter resources</Form.Label>
                <RedStar />
                <CKEditor
                  name="v_chapter_resource"
                  editor={ClassicEditor}
                  data={this.state.v_chapter_resource}
                  onChange={(event, editor) => {
                    this.setState({ v_chapter_resource: editor.getData() });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Chapter exercises</Form.Label>
                <CKEditor
                  name="v_chapter_exercise"
                  editor={ClassicEditor}
                  data={this.state.v_chapter_exercise}
                  onChange={(event, editor) => {
                    this.setState({ v_chapter_exercise: editor.getData() });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="v_chapter_files"
                  type="file"
                  onChange={this.multipleFileChangedHandler}
                  multiple
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

CreateChapter.protoTypes = {
  createChapter: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  courses: state.courses,
});
const mapDispatchToProps = (dispatch) => ({
  getCoursesByUserId: (parentuid) => dispatch(getCoursesByUserId(parentuid)),
  createChapter: (postData) => dispatch(createChapter(postData)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateChapter)
);
