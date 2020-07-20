import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getNepalData } from "../../redux/actions/coronaupdate";
import { Row, Col, Card } from "react-bootstrap";
import { NepaliFlag } from "../../assets/icons";

class Nepaldata extends Component {
  componentDidMount() {
    this.props.getNepalData();
  }
  render() {
    let a = this.props.covid;
    return (
      <>
        <Row>
          <Col xs={12} className="text-center mb-2">
            <NepaliFlag />
            <b style={{ fontSize: 22, verticalAlign: "middle", marginLeft: 5 }}>
              Nepal
            </b>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Total Cases</Card.Title>
                <Card.Text as="h5" className="font-weight-bold">
                  {a.cases}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Recovered</Card.Title>
                <Card.Text as="h5" className="font-weight-bold text-success">
                  {a.recovered}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Total Deaths</Card.Title>
                <Card.Text as="h5" className="font-weight-bold text-danger">
                  {a.deaths}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  covid: state.covid,
});
const mapDispatchToProps = (dispatch) => ({
  getNepalData: () => dispatch(getNepalData()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Nepaldata)
);
