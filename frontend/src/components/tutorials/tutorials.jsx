import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { getTutorialById } from "../../redux/actions/tutorial";
import { withRouter } from "react-router-dom";
import { Row, Container, Col, Image } from "react-bootstrap";
import Loading from "../component/spinner";

class Tutorials extends Component {
  state = {
    loading: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    var id = this.props.match.params.id;
    this.props
      .getTutorialById(id)
      .then(() => this.setState({ loading: false }));
  }
  componentWillReceiveProps(newProps) {
    if (newProps.match.params.id !== this.props.match.params.id) {
      let id = newProps.match.params.id;
      this.props.getTutorialById(id);
    }
  }
  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <>
        <Container>
          <Row>
            {this.props.tutorials.map((n) => (
              <Col xs={6} md={12} key={n.tutorial_id}>
                {n.tutorial_docs
                  .split(",")
                  .filter(Boolean)
                  .map((tutorial_docs) => (
                    <Image
                      key={`${n.tutorial_id}-${tutorial_docs}`}
                      src={`https://sammenligne.s3.eu-central-1.amazonaws.com/${tutorial_docs}`}
                      rounded
                    />
                  ))}
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  tutorials: state.tutorials,
});
const mapDispatchToProps = (dispatch) => ({
  getTutorialById: (id) => dispatch(getTutorialById(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Tutorials)
);
