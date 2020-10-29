import React from "react";
import {
  deselectAnnotation,
  highlightAnnotation,
  enterAnnotation,
  exitAnnotation
} from "../redux/actions/annotationsActions";
import { setChunk } from "../redux/actions/currentBookActions";
import { connect } from "react-redux";
import { Element, scroller } from "react-scroll";
import inView from "in-view";

// AnnotationMarker placed into text with CurrentBookActions
// Parent: Line
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
    inView(`#marker-${this.props.id}`)
      .on("enter", () => this.handleEnter())
      .on("exit", () => this.handleExit());

    if (this.props.annotation && this.props.annotation.selected) {
      this.handleScroll();
    }
  }
  componentDidUpdate(nextProps) {
    if (
      this.props.annotation &&
      this.props.annotation.selected &&
      nextProps.annotation.selected !== this.props.annotation.selected
    ) {
      this.handleScroll();
      this.props.deselectAnnotation();
    }
  }
  componentWillUnmount() {
    console.log("unmounting asterix");
  }
  handleScroll = async () => {
    console.log("scrolling");
    await this.props.setChunk(this.props.chunk, false);
    console.log("should be scrolling");
    scroller.scrollTo(`asterix-${this.props.annotation.id}`, {
      duration: 400,
      smooth: true,
      isDynamic: true,
      offset: -200
    });
  };

  isntHidden() {
    return (
      (this.props.userShow &&
        this.props.annotation.user_id === this.props.user.id) ||
      (this.props.otherShow &&
        this.props.annotation.user_id !== this.props.user.id)
    );
  }
  render() {
    // console.log("Asterix Rendered", this.props.annotation.highlighted);
    return (
      <Element
        style={{ display: "inline" }}
        name={`asterix-${this.props.annotation.id}`}
      >
        <span
          id={`marker-${this.props.id}`}
          data-id={this.props.id}
          onMouseOut={this.handleMouseOut}
          onMouseOver={this.handleMouseOver}
          className={
            this.props.annotation && this.props.annotation.highlighted
              ? "hover-marker"
              : "marker"
          }
          style={
            this.props.annotation ? { color: this.props.annotation.color } : {}
          }
        >
          *
        </span>
      </Element>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    exitAnnotation: id => dispatch(exitAnnotation(id)),
    enterAnnotation: id => dispatch(enterAnnotation(id)),
    highlightAnnotation: id => dispatch(highlightAnnotation(id)),
    setChunk: ind => dispatch(setChunk(ind)),
    deselectAnnotation: () => dispatch(deselectAnnotation())
  };
}
function mapStateToProps(state, ownProps) {
  return {
    userShow: state.windowStatus.userShow,
    otherShow: state.windowStatus.otherShow,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnotationMarker);
