import React from 'react'
import { Component } from 'react'
import { Form, Card, Row, Col, Container } from "react-bootstrap";
class Userguide extends Component {
    render() {
        return (
            <>
                <Container style={{ padding: '20px' }}>
                    <Card >
                        <Card.Header style={{ textAlign: "center", color: '#7510f7' }}>Some Guide on How to use Durbar</Card.Header>
                        <Row>
                            <Col md="12">
                                <p style={{ color: '#7510f7', marginLeft: '10px' }}><strong>For Normal User</strong></p>
                            </Col>
                            <Col md="12" style={{ marginLeft: '10px' }} >
                                <p>As the beginner user of Durbar, you can choose to Register your school by clicking <a href="https://durbar.herokuapp.com/schools/create">
                                    Register School.</a>After you send the registration request we will varify your information and send you log in credentials you as soon as possible.</p>
                            </Col>
                            <Col md="12">
                                <p style={{ color: '#7510f7', marginLeft: '10px' }}><strong>School User</strong></p>
                            </Col>
                            <Col>
                                <p style={{ marginLeft: '10px' }} >Some tips for School User of Durbar</p>
                                <ul style={{ listStyle: 'none' }}>
                                    <li>
                                        1. You have to log in with the creadentials provided by admin.</li>
                                    <li>
                                        2. You can change your password by doing <strong>Forget Password</strong></li>

                                    <li>
                                        3. After log in you will be redirected to <a href="https://durbar.herokuapp.com/school/dashboard">School Dashboard</a>
                                    </li>
                                    <li>
                                        4. Inside School Dashboard, we can register you student and add different student related activity
                                </li>
                                    <li>
                                        5. After you register you student provide them their login credentials so that they can view you updates
                                </li>

                                </ul>
                            </Col>
                            <Col md="12">
                                <p style={{ color: '#7510f7', marginLeft: '10px' }}><strong>For Student User</strong></p>
                            </Col>
                            <Col>
                                <p style={{ marginLeft: '10px' }} >Some tips for Student User of Durbar</p>
                                <ul style={{ listStyle: 'none' }}>
                                    <li>
                                        1. You have to log in with the creadentials provided by your school.</li>
                                    <li>
                                        2. You can change your password by doing <strong>Forget Password</strong></li>

                                    <li>
                                        3. After log in you will be redirected to <a href="https://durbar.herokuapp.com/student/dashboard">Student Dashboard</a>
                                    </li>
                                    <li>
                                        4. Inside Student Dashboard, by default you will see news and information related to your school.
                                </li>
                                    <li>
                                        5. You can choose to view you grades, courses and chapters by clicking on respective buttons.
                                </li>

                                </ul>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </>
        )
    }

}

export default Userguide
