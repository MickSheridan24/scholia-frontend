import React from "react";
import { connect } from "react-redux";
import { highlightAnnotation } from "../redux/actions/annotationsActions";

function AnnotationLabel(props) {
  const handleMouseOut = e => {
    props.highlightAnnotation(0);
  };
  const handleMouseOver = e => {
    props.highlightAnnotation(props.annotation.id);
  };
  console.log("Label Rendered");
  return (
    <div className="item">
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="ui segment"
        style={props.annotation.highlighted ? { background: props.annotation.color } : {}}>
        <h4>{props.annotation.title}</h4>
        <p>{props.annotation.body}</p>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return { highlightAnnotation: id => dispatch(highlightAnnotation(id)) };
}
export default connect(
  null,
  mapDispatchToProps,
)(AnnotationLabel);
