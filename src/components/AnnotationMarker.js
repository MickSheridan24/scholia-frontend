import React from "react";
import { highlightAnnotation, enterAnnotation, exitAnnotation } from "../redux/actions/annotationsActions";
import { connect } from "react-redux";
import { Element } from "react-scroll";
import inView from "in-view";

class AnnotationMarker extends React.Component {
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
    console.log("unmounting asterix");
  }

  isntHidden() {
    return (
      (this.props.userShow && this.props.annotation.user_id === this.props.user.id) ||
      (this.props.otherShow && this.props.annotation.user_id !== this.props.user.id)
    );
  }
  render() {
    // console.log("Asterix Rendered", this.props.annotation.highlighted);
    return this.props.annotation ? (
      <Element name={`asterix-${this.props.annotation.id}`}>
        <span
          id={`marker-${this.props.id}`}
          data-id={this.props.id}
          onMouseOut={this.handleMouseOut}
          onMouseOver={this.handleMouseOver}
          className={this.props.annotation && this.props.annotation.highlighted ? "hover-marker" : "marker"}
          style={this.props.annotation ? { color: this.props.annotation.color } : {}}>
          {this.isntHidden() ? "*" : ""}
        </span>
      </Element>
    ) : null;
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
    userShow: state.windowStatus.userShow,
    otherShow: state.windowStatus.otherShow,
    user: state.user,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationMarker);
