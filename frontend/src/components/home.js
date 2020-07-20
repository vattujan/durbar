import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Teaching, Learning, Student, School } from '../assets/icons';
import PrimaryButton from './component/primaryButton';
import '../home.scss';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Row className="wrapper">
          <Col className="text-column" md="6">
            <h1 style={{ fontWeight: 800 }}>Software as comprehensive as your curriculum</h1>
            <p>Durbar has everything you need to completely run an educational institution, from preschool all the way up to university.</p>
            <PrimaryButton link="/schools/create" classes="is-highlighted btn-lg" title="Connect with us" />
          </Col>
          <Col md="6">
            <Teaching />
          </Col>
        </Row>

        <Row className="with-background m-0">
          <Row className="wrapper">
            <Col className="text-column" md={{ order: 2 }}>
              <h1>What is Durbar?</h1>
              <p>With Durbar, you can manage your student activity more easily. It is platform where you directly connect with you student online and update their study course, acadmic records and well various other activity.</p>
            </Col>
            <Col md={{ order: 1 }}>
              <Learning />
            </Col>
          </Row>
        </Row>

        <Row className="wrapper">
          <Col className="text-center mb-5" xs="12">
            <h1>Personalized Portals</h1>
            <p>Stay ahead. Stay connected.</p>
          </Col>
          <Col className="text-center pl-5 pr-5" md="6">
            <School />
            <h2 className="mt-4">School Portal</h2>
            <p>Run your institute from the palm of your hand. With all the administrative information on a single, readily accessible dashboard, you'll never have to waste time searching through tabs and files.</p>
          </Col>
          <Col className="text-center pl-5 pr-5" md="6">
            <Student />
            <h2 className="mt-4">Student Portal</h2>
            <p>Put an end to crowding around the bulletin board for academic and extracurricular updates. Students can now instantly download study materials and help improve the learning experience.</p>
          </Col>
        </Row>

        <footer>
          <Row className="with-background m-0">
            <Row className="wrapper">
              <Col md="2" className="text-column">
                <Link to="/">Home</Link>
              </Col>
              <Col md="4" className="text-column">
                <Link to="/schools/create">Register school</Link>
              </Col>
              <Col md="3" className="text-column">
                <Link to="/contactus">Contact us</Link>
              </Col>
              <Col md="4" className="text-column">
                <Link to="/userguide">User Guide</Link>
              </Col>
            </Row>
          </Row>
        </footer>
      </React.Fragment>
    );
  }
}

export default Home;
