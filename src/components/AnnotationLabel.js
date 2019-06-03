import React, { useState } from "react";
import { connect } from "react-redux";
import {
  highlightAnnotation,
  deleteAnnotation,
  likeAnnotation,
  selectAnnotation,
} from "../redux/actions/annotationsActions";
import EditAnnotationForm from "./EditAnnotationForm";

// AnnotationLabel displays Annotation info in the UI
// Parent: AnnotationsContainer
function AnnotationLabel(props) {
  const [editMode, setEditMode] = useState(false);
  const [postEdit, setPostEdit] = useState(false);

  const handleMouseOver = e => {
    console.log("enter");
    props.highlightAnnotation(props.annotation.id);
  };
  const handleMouseOut = e => {
    props.highlightAnnotation(0);
  };
  const handleDelete = e => {
    props.deleteAnnotation(props.annotation.id);
  };
  const handleEdit = b => {
    setEditMode(b);
  };
  const handleSubmitEdit = e => {
    setPostEdit(true);
    setEditMode(false);
  };
  const handleLike = e => {
    props.likeAnnotation(props.annotation.id);
  };
  return (
    <div
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      onClick={() => props.selectAnnotation(props.annotation)}
      className="ui segment annotation-label"
      style={
        props.annotation.highlighted
          ? { color: props.annotation.color }
          : { borderLeft: `4px solid ${props.annotation.color}` }
      }>
      <div className="label-main">
        {editMode ? (
          <EditAnnotationForm
            postEdit={postEdit}
            setPostEdit={setPostEdit}
            title={props.annotation.title}
            body={props.annotation.body}
          />
        ) : (
          <React.Fragment>
            <h4 className="label-title">
              {props.annotation.title}{" "}
              {props.annotation.study ? (
                <div className="label-study-information">{props.annotation.study.name}</div>
              ) : null}
            </h4>
            {props.annotation.body}
          </React.Fragment>
        )}
      </div>
      <div className="label-right">
        <div className="like-count">{props.annotation.likeCount}</div>
        {props.userId === props.annotation.user_id ? (
          <React.Fragment>
            {editMode ? (
              <i className="checkmark icon label-button" onClick={handleSubmitEdit} />
            ) : (
              <i className="pencil alternate icon label-button" onClick={() => handleEdit(true)} />
            )}
            {editMode ? (
              <i className="ban icon label-button" onClick={() => handleEdit(false)} />
            ) : (
              <i className=" close icon label-button" onClick={handleDelete} />
            )}
          </React.Fragment>
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
    selectAnnotation: annotation => dispatch(selectAnnotation(annotation)),
  };
}
function mapStateToProps(state) {
  return { userId: state.user.id };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationLabel);
