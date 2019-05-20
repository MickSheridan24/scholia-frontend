import React from "react";
import { highlightAnnotation, enterAnnotation, exitAnnotation } from "../redux/actions/annotationsActions";
import { connect } from "react-redux";
import inView from "in-view";

class AnnotationMarker extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.annotation.highlighted !== this.props.annotation.highlighted;
  }
  handleMouseOut = e => {
    this.props.highlightAnnotation(0);
  };
  handleMouseOver = e => {
    this.props.highlightAnnotation(this.props.id);
  };
  handleEnter = () => {
    console.log("enter");
    this.props.enterAnnotation(this.props.id);
  };
  handleExit = () => {
    console.log("exit");
    this.props.exitAnnotation(this.props.id);
  };

  componentDidMount() {
    inView(`#marker-${this.props.id}`)
      .on("enter", () => this.handleEnter())
      .on("exit", () => this.handleExit());
  }
  componentWillUnmount() {
    console.log("unmounting");
  }
  render() {
    console.log("Asterix Rendered", this.props.annotation.highlighted);
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
