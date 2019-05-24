import React from "react";
import { connect } from "react-redux";
import {
  highlightAnnotation,
  deleteAnnotation,
  likeAnnotation,
  selectAnnotation,
} from "../redux/actions/annotationsActions";

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
  const handleLike = e => {
    props.likeAnnotation(props.annotation.id);
  };
  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => props.selectAnnotation(props.annotation.id)}
      className="ui segment annotation-label"
      style={
        props.annotation.highlighted
          ? { color: props.annotation.color }
          : { "border-left": `2px solid ${props.annotation.color}` }
      }>
      {props.userId === props.annotation.user_id ? (
        <button onClick={handleDelete} className="ui mini right floated button" style={{ color: "red" }}>
          X
        </button>
      ) : props.annotation.userLiked ? null : (
        <button className="ui mini right floated button" onClick={handleLike}>
          Like
        </button>
      )}
      <h4 className="label-title">
        {props.annotation.title} <em>({props.annotation.likeCount})</em>
      </h4>

      <p>{props.annotation.body}</p>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    highlightAnnotation: id => dispatch(highlightAnnotation(id)),
    deleteAnnotation: id => dispatch(deleteAnnotation(id)),
    likeAnnotation: id => dispatch(likeAnnotation(id)),
    selectAnnotation: id => dispatch(selectAnnotation(id)),
  };
}
function mapStateToProps(state) {
  return { userId: state.user.id };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationLabel);
