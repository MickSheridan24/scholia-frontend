import React from "react";
import { connect } from "react-redux";
import { highlightAnnotation, deleteAnnotation } from "../redux/actions/annotationsActions";

function AnnotationLabel(props) {
  const handleMouseOut = e => {
    props.highlightAnnotation(0);
  };
  const handleMouseOver = e => {
    props.highlightAnnotation(props.annotation.id);
  };
  const handleDelete = e => {
    props.deleteAnnotation(props.annotation.id);
  };
  return (
    <div className="item">
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="ui segment"
        style={
          props.annotation.highlighted
            ? { background: props.annotation.color }
            : { border: `2px solid ${props.annotation.color}` }
        }>
        <button onClick={handleDelete} className="ui mini left floated button" style={{ color: "red" }}>
          X
        </button>
        <h4>{props.annotation.title}</h4>
        <p>{props.annotation.body}</p>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    highlightAnnotation: id => dispatch(highlightAnnotation(id)),
    deleteAnnotation: id => dispatch(deleteAnnotation(id)),
  };
}
export default connect(
  null,
  mapDispatchToProps,
)(AnnotationLabel);
