import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudentById } from "../../redux/actions/students";
import Table from "react-bootstrap/Table";
import { withRouter } from "react-router-dom";
import { Card } from "react-bootstrap";

class Records extends Component {
  componentDidMount() {
    var id = localStorage.getItem("student_id");
    this.props.getStudentById(id);
  }

  render() {
    return (
      <>
        <Card>
          <Card.Header as="h5">My Academic Records</Card.Header>
          <Card.Body>
            <Table className="mb-0" striped bordered responsive size="sm">
              <thead>
                <tr>
                  <th>Exam Id</th>
                  <th>Examination Date</th>
                  <th>Student Id</th>
                  <th>Subject</th>
                  <th>Examination Type</th>
                  <th>Grades</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {this.props.students.map((exam) => (
                  <tr key={exam.examination_id}>
                    <td>{exam.examination_id}</td>
                    <td>{exam.examination_date}</td>
                    <td>{exam.student_id}</td>
                    <td>{exam.course}</td>
                    <td>{exam.exam_type}</td>
                    <td>{exam.scores}</td>
                    <td>{exam.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  students: state.students,
});
const mapDispatchToProps = (dispatch) => ({
  getStudentById: (id) => dispatch(getStudentById(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Records)
);
