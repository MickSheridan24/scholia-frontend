import React from "react";
import { highlightAnnotation } from "../redux/actions/annotationsActions";
import { connect } from "react-redux";
import inView from "in-view";

class AnnotationMarker extends React.PureComponent {
  componentDidMount() {
    inView(`#marker-${this.props.id}`)
      .on("enter", el => console.log("enter", el.dataset.id))
      .on("exit", el => console.log("exit", el.dataset.id));
  }
  handleMouseOut = e => {
    this.props.highlightAnnotation(0);
  };
  handleMouseOver = e => {
    this.props.highlightAnnotation(this.props.id);
  };
  render() {
    return (
      <span
        id={`marker-${this.props.id}`}
        data-id={this.props.id}
        onMouseOut={this.handleMouseOut}
        onMouseOver={this.handleMouseOver}
        className="marker">
        *
      </span>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { highlightAnnotation: id => dispatch(highlightAnnotation(id)) };
}

export default connect(
  null,
  mapDispatchToProps,
)(AnnotationMarker);
