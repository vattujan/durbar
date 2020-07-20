import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import { Student, Employee, Subject, Classes } from "../../assets/icons";
import { getSchools } from "../../redux/actions/schools";
import { getCoursesByUserId } from "../../redux/actions/courses";
import { COURSES } from "../../constants/routes";
import { withRouter } from "react-router-dom";

class StatCards extends Component {
  componentDidMount() {
    let currentUserUID = localStorage.getItem("currentUserUID");
    this.props.getSchools();
    this.props.getCoursesByUserId(currentUserUID);
  }
  goToCourses = () => {
    this.props.history.push(COURSES);
  };

  render() {
    let role = localStorage.getItem("currentUserRole")
    return (
      <>
        {/* Admin stats */}
        {(() => {
          switch (role) {
            case 'Admin':
              return (
                <Row className="mb-4">
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm="auto">
                            <Student />
                          </Col>
                          <Col>
                            <Card.Title>
                              {this.props.schools.length}
                            </Card.Title>
                            <Card.Text>Total Schools</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm="auto">
                            <Subject />
                          </Col>
                          <Col>
                            <Card.Title>{
                              this.props.schools.filter(
                                (s) => s.school_verified === "true"
                              ).length
                            }</Card.Title>
                            <Card.Text>Total Verified Schools</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm="auto">
                            <Employee />
                          </Col>
                          <Col>
                            <Card.Title>2</Card.Title>
                            <Card.Text>Admin Authority</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              );
            case 'School':
              return (
                <Row className="mb-4">
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm="auto">
                            <Employee />
                          </Col>
                          <Col>
                            <Card.Title>
                              16
                            </Card.Title>
                            <Card.Text>Total Employees</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm="auto">
                            <Student />
                          </Col>
                          <Col>
                            <Card.Title>
                              31
                            </Card.Title>
                            <Card.Text>Registered Students</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm="auto">
                            <Classes />
                          </Col>
                          <Col>
                            <Card.Title>12</Card.Title>
                            <Card.Text>Total Classes</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm="auto">
                            <Subject />
                          </Col>
                          <Col onClick={this.goToCourses} style={{ cursor: "pointer" }}>
                            <Card.Title>{this.props.courses.length} </Card.Title>
                            <Card.Text>Total Courses</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

              );
            case "Student":
              return (
                <Row className="mb-4">
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm="auto">
                            <Employee />
                          </Col>
                          <Col>
                            <Card.Title>
                              21
                              </Card.Title>
                            <Card.Text>Total Students</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm="auto">
                            <Classes />
                          </Col>
                          <Col onClick={this.goToCourses} style={{ cursor: "pointer" }}>
                            <Card.Title>{this.props.courses.length} </Card.Title>
                            <Card.Text>Total Courses</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm="auto">
                            <Student />
                          </Col>
                          <Col>
                            <Card.Title style={{ fontSize: '13px' }}>
                              Present: 12 days  Absent: 3 days
                              </Card.Title>
                            <Card.Text>Monthly Attendance</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col sm="auto">
                            <Subject />
                          </Col>
                          <Col>
                            <Card.Title>{this.props.news.length}</Card.Title>
                            <Card.Text>Posted News</Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>

                </Row>
              )
          }
        })()}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  schools: state.schools,
  courses: state.courses,
  news: state.news
});

const mapDispatchToProps = (dispatch) => ({
  getSchools: () => dispatch(getSchools()),
  getCoursesByUserId: (id) => dispatch(getCoursesByUserId(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StatCards)
);
