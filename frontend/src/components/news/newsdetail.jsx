import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getNewsDetail } from "../../redux/actions/news";

class Newsdetail extends Component {
  componentDidMount() {
    var id = this.props.match.params.id;
    this.props.getNewsDetail(id);
  }
  render() {
    return (
      <>
        <Container>
          <Row>
            {this.props.newsdetail.map((n) => (
              <Col key={n.news_id}>
                <h4>{n.news_title}</h4>
                <p className="text-muted">{Moment(n.created_on).fromNow()}</p>
                <p dangerouslySetInnerHTML={{ __html: n.news_content }} />
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  newsdetail: state.newsdetail,
});
const mapDispatchToProps = (dispatch) => ({
  getNewsDetail: (id) => dispatch(getNewsDetail(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Newsdetail)
);
