import React from "react";
import Form from "react-bootstrap/Form";

class RedStar extends React.Component {
  render() {
    return <Form.Label className="text-danger">*</Form.Label>;
  }
}

export default RedStar;