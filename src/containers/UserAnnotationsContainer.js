import React, { Component } from "react";
import UserAnnotationLabel from "../components/UserAnnotationLabel";
import { connect } from "react-redux";

class UserAnnotationsContainer extends Component {
  displayAnnotations = () => {
    return this.props.annotations.map(a => {
      return <UserAnnotationLabel annotation={a} />;
    });
  };
  render() {
    return <div>{this.displayAnnotations()}</div>;
  }
}
function mapStateToProps(state) {
  return { annotations: state.userAnnotations };
}

export default connect(mapStateToProps)(UserAnnotationsContainer);
