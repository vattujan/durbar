import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getCoursesDetail } from "../../redux/actions/courses";
import { getChaptersByCourseId } from "../../redux/actions/chapters";
import PropTypes from "prop-types";
import Loading from "../component/spinner";
import { PdfIcon } from "../../assets/icons";

class Coursesdetail extends Component {
  state = {
    isHovered: {},
    hover: false,
    loading: false,
  };
  componentDidMount() {
    var id = this.props.match.params.id;
    this.setState({ loading: true });
    this.props
      .getCoursesDetail(id)
      .then(() => this.props.getChaptersByCourseId(id))
      .then(() => this.setState({ loading: false }));
  }
  handleMouseEnter = (index) => {
    this.setState((prevState) => {
      return { isHovered: { ...prevState.isHovered, [index]: true } };
    });
  };

  handleMouseLeave = (index) => {
    this.setState((prevState) => {
      return { isHovered: { ...prevState.isHovered, [index]: false } };
    });
  };
  render() {
    let role = localStorage.getItem("currentUserRole");
    let props = this.props;
    return this.state.loading ? (
      <Loading />
    ) : (
      <>
        <Row>
          {props.detailcourses.map((n) => (
            <Col key={n.course_id}>
              <div
                onMouseEnter={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })}
              >
                <h4 className="d-inline">{n.course_title}</h4>
                {role === "School" ? (
                  <>
                    <Button
                      className={this.state.hover ? "" : "invisible"}
                      variant="link"
                      onClick={() =>
                        this.props.history.push(`/courses/edit/${n.course_id}`)
                      }
                    >
                      Edit
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                <p>{n.course_description}</p>
                {role === "Student" ? (
                  <Link to={`/tutorials/${n.course_id}`}>
                    {this.context.t("view_tutorials")}
                  </Link>
                ) : (
                  <></>
                )}
                {role === "School" ? (
                  <Link className="ml-3" to={`/chapters/create/${n.course_id}`}>
                    Add chapters
                  </Link>
                ) : (
                  <></>
                )}
              </div>
              <hr style={{ borderTop: "4px solid #0000001a" }}></hr>
              {props.chapters.length ? (
                props.chapters.map((c, index) => (
                  <Chapters
                    key={index}
                    onMouseEnter={() => this.handleMouseEnter(index)}
                    onMouseLeave={() => this.handleMouseLeave(index)}
                    isHovering={this.state.isHovered[index]}
                    c={c}
                    index={index}
                    props={props}
                  />
                ))
              ) : (
                <h5 className="text-center">
                  There are no chapters to display
                </h5>
              )}
            </Col>
          ))}
        </Row>
      </>
    );
  }
}
const Chapters = ({
  c,
  onMouseEnter,
  onMouseLeave,
  index,
  isHovering,
  props,
}) => {
  let role = localStorage.getItem("currentUserRole");
  return (
    <React.Fragment key={c.chapter_id}>
      <Row
        className="m-1"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Col xs="12" className="text-center">
          <h3 className="d-inline">
            Chapter {index + 1}: {c.chapter_title}
          </h3>
          {(() => {
            if (role === "School") {
              return (
                <>
                  <Button
                    className={isHovering ? "" : "invisible"}
                    variant="link"
                    onClick={() =>
                      props.history.push(`/chapters/edit/${c.chapter_id}`)
                    }
                  >
                    Edit
                  </Button>
                </>
              );
            }
          })()}
        </Col>
        <Col>
          <h5>Topics</h5>
          <p dangerouslySetInnerHTML={{ __html: c.chapter_topics }} />
        </Col>
        <Col>
          <h5>Resource</h5>
          <p
            dangerouslySetInnerHTML={{
              __html: c.chapter_resource,
            }}
          />
        </Col>
        <Col>
          <h5>Exercise</h5>
          <p
            dangerouslySetInnerHTML={{
              __html: c.chapter_exercise,
            }}
          />
        </Col>
        <Col xs="12">
          {c.chapter_files &&
            c.chapter_files
              .split(",")
              .filter(Boolean)
              .map((chapter_file, index) => (
                <React.Fragment key={index}>
                  <Button
                    variant="link"
                    href={`https://sammenligne.s3.eu-central-1.amazonaws.com/${chapter_file}`}
                  >
                    <PdfIcon />
                    {chapter_file.substr(13)}
                  </Button>
                  <br></br>
                </React.Fragment>
              ))}
        </Col>
      </Row>
      <hr></hr>
    </React.Fragment>
  );
};
Coursesdetail.contextTypes = {
  t: PropTypes.func,
};
const mapStateToProps = (state) => ({
  detailcourses: state.detailcourses,
  chapters: state.chapters,
  lang: state.i18nState.lang,
});
const mapDispatchToProps = (dispatch) => ({
  getCoursesDetail: (id) => dispatch(getCoursesDetail(id)),
  getChaptersByCourseId: (id) => dispatch(getChaptersByCourseId(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Coursesdetail)
);
