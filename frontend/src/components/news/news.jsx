import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Moment from "moment";
import { withRouter } from "react-router-dom";
import Tooltips from "../component/tooltip";
import { connect } from "react-redux";
import { getNewsById } from "../../redux/actions/news";

class News extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      parentUID: "",
    };
  }
  componentDidMount() {
    let role = localStorage.getItem("currentUserRole");
    if (role === "Student") {
      let id = localStorage.getItem("parentUID");
      this.props.getNewsById(id);
    } else if (role === "School") {
      let id = localStorage.getItem("currentUserUID");
      this.props.getNewsById(id);
    }
  }
  getDetail = (id) => {
    this.props.history.push(`/news/detail/${id}`);
  };
  render() {
    return (
      <>
        <Row>
          {this.props.news.map((n) => (
            <Col className="mb-5" sm={6} md={4} key={n.news_id}>
              <Tooltips
                tooltip={n.news_title}
                link={
                  <h4
                    className="news-link mr-auto"
                    onClick={() => this.getDetail(n.news_id)}
                  >
                    {n.news_title}
                  </h4>
                }
              />
              <p className="text-muted">{Moment(n.created_on).fromNow()}</p>
            </Col>
          ))}
        </Row>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.user,
  news: state.news,
});
const mapDispatchToProps = (dispatch) => ({
  getNewsById: (id) => dispatch(getNewsById(id)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));
