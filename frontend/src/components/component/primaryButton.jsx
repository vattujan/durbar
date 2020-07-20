import React, { Component } from "react";
import { Link } from "react-router-dom";

class PrimaryButton extends Component {
  render() {
    return (
      <Link
        to={this.props.link}
        className={`btn btn-primary ${this.props.classes}`}
      >
        {this.props.title}
      </Link>
    );
  }
}

export default PrimaryButton;
