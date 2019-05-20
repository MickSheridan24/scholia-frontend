import React, { useState, useEffect } from "react";
import { highlightAnnotation, enterAnnotation, exitAnnotation } from "../redux/actions/annotationsActions";
import { connect } from "react-redux";
import inView from "in-view";

class AnnotationMarker extends React.Component {
  handleMouseOut = e => {
    this.props.highlightAnnotation(0);
  };
  handleMouseOver = e => {
    this.props.highlightAnnotation(this.props.id);
  };
  handleEnter = () => {
    this.props.enterAnnotation(this.props.id);
  };
  handleExit = () => {
    this.props.exitAnnotation(this.props.id);
  };

  componentDidMount() {
    if (inView.is(document.getElementById(`marker-${this.props.id}`))) {
      this.handleEnter();
    }
    inView(`#marker-${this.props.id}`)
      .on("enter", () => this.handleEnter())
      .on("exit", () => this.handleExit());
    return () => {};
  }
  render() {
    return (
      <span
        id={`marker-${this.props.id}`}
        data-id={this.props.id}
        onMouseOut={this.handleMouseOut}
        onMouseOver={this.handleMouseOver}
        className={this.props.annotation && this.props.annotation.highlighted ? "hover-marker" : "marker"}>
        *
      </span>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    exitAnnotation: id => dispatch(exitAnnotation(id)),
    enterAnnotation: id => dispatch(enterAnnotation(id)),
    highlightAnnotation: id => dispatch(highlightAnnotation(id)),
  };
}
function mapStateToProps(state, ownProps) {
  return {
    annotation: state.otherAnnotations.find(a => a.id === parseInt(ownProps.id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationMarker);
