import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getWorldData } from "../../redux/actions/coronaupdate";
import { Row, Col, Card } from "react-bootstrap";
import { WorldFlag } from "../../assets/icons";

class Worlddata extends Component {
  componentDidMount() {
    this.props.getWorldData();
  }
  render() {
    let a = this.props.wpcovid;
    return (
      <>
        <Row>
          <Col xs={12} className="text-center mb-2">
            <WorldFlag />
            <b style={{ fontSize: 22, verticalAlign: "middle", marginLeft: 5 }}>
              World
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
  wpcovid: state.wpcovid,
});
const mapDispatchToProps = (dispatch) => ({
  getWorldData: () => dispatch(getWorldData()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Worlddata)
);
