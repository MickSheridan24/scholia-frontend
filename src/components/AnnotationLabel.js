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
      <div className="label-main">
        <h4 className="label-title">
          {props.annotation.title}{" "}
          {props.annotation.study ? <div className="label-study-information">{props.annotation.study.name}</div> : null}
        </h4>
        {props.annotation.body}
      </div>
      <div className="label-right">
        <div className="like-count">{props.annotation.likeCount}</div>
        {props.userId === props.annotation.user_id ? (
          <i className=" close icon label-button" onClick={handleDelete} />
        ) : props.annotation.userLiked ? (
          <i className=" star  icon label-button" onClick={handleLike} />
        ) : (
          <i className=" star outline icon label-button" onClick={handleLike} />
        )}
      </div>
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
