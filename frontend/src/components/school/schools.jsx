import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../firebase";
import md5 from "md5";
import Table from "react-bootstrap/Table";
import Link from "react-bootstrap/NavLink";
import { Modal, Button } from "react-bootstrap";
import { RecycleBin, Edit } from "../../assets/icons";
import { toast } from "react-toastify";
import Tooltips from "../component/tooltip";
import emailjs from "emailjs-com";
import {
  getSchools,
  deleteSchools,
  editSchool,
} from "../../redux/actions/schools";
import { Form } from "react-bootstrap";

class School extends Component {
  constructor(props) {
    super(props);
    this.props.getSchools();
    this.state = {
      show: false,
      value: false,
      schoolID: 0,
    };
  }

  deleteSchool = async (id) => {
    if (window.confirm("Do you want to delete this school?") === true) {
      await this.props.deleteSchools(id);
    }
  };

  openModal = (id, verified) => {
    this.setState({ show: true, schoolID: id, value: verified });
  };
  handleClose = () => {
    this.setState({ show: false, schoolID: 0 });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value === "true" ? true : false });
  };

  saveUser = (createdUser) => {
    return firebase
      .database()
      .ref("users")
      .child(createdUser.user.uid)
      .set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL,
        role: "School",
        parentUID: localStorage.getItem("currentUserUID"),
      });
  };

  handleSubmit = async (email, username) => {
    let data = {
      id: this.state.schoolID,
      value: this.state.value,
    };
    await this.props.editSchool(data);
    // if school is verified register it in our firebase database
    if (this.state.value === true) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, "123456")
        .then((createdUser) => {
          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: `http://gravatar.com/avatar/${md5(email)}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser);
              console.log(createdUser);
            });
          toast.success(
            `School is verified and successfully registered school as ${email}`,
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
            }
          );
        }).then(() => {
          var emailData = {
            "reply_to": `${email}`,
            "from_name": "durbar120@gmail.com",
            "to_name": `${username}`,
            "message_html": `Your School now has been verified by the admin. You can now Logged in with EMAIL: ${email} and Password: 123456. Please change your Password by doing Forget Passowd.`,
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
        })
        .catch((err) => {
          toast.error(`${err.message}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
          });
        });
    }
    await this.handleClose();
    await this.props.getSchools();
  };

  modalForm = () => {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Verify</Form.Label>
          <Form.Control
            as="select"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Form.Control>
          <Form.Text className="text-muted">
            Choose whether to verify the school or not.
          </Form.Text>
        </Form.Group>
      </Form>
    );
  };

  render() {
    return (
      <>
        <Table className="mb-0" striped bordered responsive size="sm">
          <thead>
            <tr>
              <th>#Id</th>
              <th>School's name</th>
              <th>Short name</th>
              <th>Email</th>
              <th>Website</th>
              <th>Phone no.</th>
              <th>Address</th>
              <th>Registration no.</th>
              <th>Verified</th>
              <th>Created on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.schools.map((school) => (
              <tr key={school.school_id}>
                <td>{school.school_id}</td>
                <td>{school.school_name}</td>
                <td>{school.school_short_name}</td>
                <td>{school.school_email}</td>
                <td>
                  <Tooltips
                    tooltip={school.school_website}
                    link={
                      <Link href={school.school_website}>
                        {school.school_short_name}
                      </Link>
                    }
                  />
                </td>
                <td>{school.school_phone_number}</td>
                <td>{school.school_address}</td>
                <td>{school.school_registration_number}</td>
                <td>{school.school_verified}</td>
                <td>{school.created_on}</td>
                <td>
                  <Tooltips
                    tooltip="Delete school"
                    link={
                      <Link
                        className="float-left"
                        onClick={() => this.deleteSchool(school.school_id)}
                      >
                        <RecycleBin />
                      </Link>
                    }
                  />
                  <Tooltips
                    tooltip="Edit school"
                    link={
                      <Link
                        className="float-right"
                        onClick={() =>
                          this.openModal(
                            school.school_id,
                            school.school_verified
                          )
                        }
                      >
                        <Edit />
                      </Link>
                    }
                  />
                </td>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit School</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{this.modalForm()}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() =>
                        this.handleSubmit(
                          school.school_email,
                          school.school_short_name
                        )
                      }
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  schools: state.schools,
});

const mapDispatchToProps = (dispatch) => ({
  getSchools: () => dispatch(getSchools()),
  deleteSchools: (id) => dispatch(deleteSchools(id)),
  editSchool: (id, value) => dispatch(editSchool(id, value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(School);
