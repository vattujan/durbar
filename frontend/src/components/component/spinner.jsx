import React from "react";
import Spinner from "react-bootstrap/Spinner";

class Loading extends React.Component {
  render() {
    return (
      <>
        <Spinner
          animation="border"
          role="status"
          style={{
            position: "absolute",
            top: "calc(0px - 54px)",
            left: "calc(0px + 250px)",
            right: "0",
            bottom: "0",
            margin: "auto",
          }}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      </>
    );
  }
}

export default Loading;
