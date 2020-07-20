import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { COURSES } from "../../constants/routes";
import { editChapter, getChapterById } from "../../redux/actions/chapters";
import RedStar from "../component/redStar";
import { getCoursesByUserId } from "../../redux/actions/courses";

class EditChapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      v_chapter_title: "",
      v_chapter_topics: "",
      v_chapter_resource: "",
      v_chapter_exercise: "",
      v_chapter_files: null,
      v_chapter_id: "",
    };
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getChapterById(id).then(() =>
      this.props.chapters.map((c) =>
        this.setState({
          v_chapter_id: id,
          v_chapter_title: c.chapter_title,
          v_chapter_topics: c.chapter_topics,
          v_chapter_resource: c.chapter_resource,
          v_chapter_exercise: c.chapter_exercise,
          v_chapter_files: c.chapter_files,
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
    let data = new FormData();
    data.append("v_chapter_id", this.state.v_chapter_id);
    data.append("v_chapter_title", this.state.v_chapter_title);
    data.append("v_chapter_topics", this.state.v_chapter_topics);
    data.append("v_chapter_resource", this.state.v_chapter_resource);
    data.append("v_chapter_exercise", this.state.v_chapter_exercise);
    for (let i = 0; i < this.state.v_chapter_files.length; i++) {
      data.append("v_chapter_files", this.state.v_chapter_files[i]);
    }
    this.props.editChapter(data).then(() => {
      toast.success(`Chapter has been successfully edited`, {
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
    } = this.state;
    const isDisable =
      v_chapter_title === "" ||
      v_chapter_topics === "" ||
      v_chapter_resource === "";
    return (
      <>
        <Card>
          <Card.Header as="h5">Edit Chapter</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Chapter title</Form.Label>
                <RedStar />
                <Form.Control
                  name="v_chapter_title"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.v_chapter_title}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Chapter topics</Form.Label>
                <RedStar />
                <CKEditor
                  editor={ClassicEditor}
                  data={this.state.v_chapter_topics}
                  onChange={(event, editor) => {
                    this.setState({ v_chapter_topics: editor.getData() });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Chapter resource</Form.Label>
                <RedStar />
                <CKEditor
                  editor={ClassicEditor}
                  data={this.state.v_chapter_resource}
                  onChange={(event, editor) => {
                    this.setState({ v_chapter_resource: editor.getData() });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Chapter exercise</Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={this.state.v_chapter_exercise}
                  onChange={(event, editor) => {
                    this.setState({ v_chapter_exercise: editor.getData() });
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Chapter files</Form.Label>
                <Form.Control
                  name="v_chapter_files"
                  type="file"
                  onChange={this.multipleFileChangedHandler}
                  multiple
                />
                {this.props.chapters.map(
                  (c) =>
                    c.chapter_files &&
                    c.chapter_files
                      .split(",")
                      .filter(Boolean)
                      .map((chapter_file, index) => (
                        <React.Fragment key={index}>
                          <Button
                            variant="link"
                            href={`https://sammenligne.s3.eu-central-1.amazonaws.com/${chapter_file}`}
                          >
                            {chapter_file}
                          </Button>
                          <br></br>
                        </React.Fragment>
                      ))
                )}
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
EditChapter.protoTypes = {
  editChapter: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  chapters: state.chapters,
});
const mapDispatchToProps = (dispatch) => ({
  editChapter: (data) => dispatch(editChapter(data)),
  getCoursesByUserId: (id) => dispatch(getCoursesByUserId(id)),
  getChapterById: (id) => dispatch(getChapterById(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditChapter)
);
