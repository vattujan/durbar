import React, { Component } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

class Tooltips extends Component {
  render() {
    return (
      <OverlayTrigger
        rootClose
        placement={this.props.placement ? this.props.placement : "bottom"}
        overlay={<Tooltip id="button-tooltip">{this.props.tooltip}</Tooltip>}
        delay={{ show: 500, hide: 0 }}
      >
        {this.props.link}
      </OverlayTrigger>
    );
  }
}

export default Tooltips;
