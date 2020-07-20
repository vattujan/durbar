import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from "../../firebase";
import { SCHOOL_BOARD } from "../../constants/routes";
import { connect } from "react-redux";
import { createNews } from "../../redux/actions/news";
import { withRouter } from "react-router-dom";
import { Card } from "react-bootstrap";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import RedStar from "../component/redStar";

class CreateNews extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      v_news_title: "",
      v_news_content: "",
      user: "",
    };
  }
  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (this._isMounted) {
        if (user) {
          this.setState({ user });
        }
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChange = (event) => {
    event.preventDefault();
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      v_news_title: this.state.v_news_title,
      v_news_content: this.state.v_news_content,
      user: this.state.user.uid,
    };
    this.props.createNews(postData).then(() => {
      alert("News has been Successfully Created");
      this.props.history.push(SCHOOL_BOARD);
    });
  };

  render() {
    const { v_news_title, v_news_content } = this.state;
    const isDisable = v_news_title === "" || v_news_content === "";
    return (
      <>
        <Card>
          <Card.Header as="h5">Post News</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>News title</Form.Label>
                <RedStar />
                <Form.Control
                  name="v_news_title"
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>News content</Form.Label>
                <RedStar />
                <CKEditor
                  editor={ClassicEditor}
                  data={this.state.v_news_content}
                  onChange={(event, editor) => {
                    this.setState({ v_news_content: editor.getData() });
                  }}
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
const mapStateToProps = (state) => ({
  v_news_title: state.v_news_title,
  v_news_content: state.v_news_content,
});
const mapDispatchToProps = (dispatch) => ({
  createNews: (data) => dispatch(createNews(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateNews));
