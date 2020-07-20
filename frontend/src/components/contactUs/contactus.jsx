import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CKEditor from "react-ckeditor-component";
import { withRouter } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { LANDING } from "../../constants/routes";

class ContactUs extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      from_name: "",
      subject: "",
      message_html: "Write your message here!",
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  updateContent = (newContent) => {
    this.setState({
      message_html: newContent,
    });
  };
  ckeditorText = (evt) => {
    var newContent = evt.editor.getData();
    this.setState({
      message_html: newContent,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    var service_id = "gmail";
    var template_id = "template_KaBpTz7d";
    var user_id = "user_LwWul1HxoMHszwY9OJLRz";
    emailjs.send(service_id, template_id, this.state, user_id);
    toast.success("Your Message has been sent. We will contact you soon", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
    });
    this.props.history.push(LANDING);
  };

  render() {
    return (
      <>
        <Container>
          <Card>
            <Card.Header as="h5">Contact us</Card.Header>
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="from_name"
                    type="email"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    name="subject"
                    type="text"
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <CKEditor
                    activeClass="p10"
                    content={this.state.message_html}
                    events={{
                      change: this.ckeditorText,
                    }}
                    config={{
                      removeButtons:
                        "Cut,Copy,Paste,Source,Table,Anchor,Unlink,Image,HorizontalRule,Superscript,PasteFromWord,PasteText,Undo,Redo,Link,SpecialChar,Maximize,Scayt,About",
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Send
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}

export default withRouter(ContactUs);

// check email on
// email address: durbar120@gmail.com
//password: Password3885
