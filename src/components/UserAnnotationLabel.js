import React, { useState } from "react";

// UserAnnotationLabel for displaying a user's annotation
// Parent: UserHome

function UserAnnotationLabel(props) {
  const handleDelete = () => {};
  const [highlighted, setHighlighted] = useState(false);
  return (
    <div
      onMouseEnter={() => setHighlighted(true)}
      onMouseLeave={() => setHighlighted(false)}
      className="user-label"
      style={highlighted ? { color: props.annotation.color } : { borderLeft: `2px solid ${props.annotation.color}` }}>
      <div className="label-main">
        <h4 className="label-title">
          {props.annotation.title}
          {props.annotation.book ? <div className="user-label-book-title">{props.annotation.book.title}</div> : null}
          {props.annotation.study ? <div className="label-study-information">{props.annotation.study.name}</div> : null}
        </h4>
        {props.annotation.body}
      </div>
      <div className="label-right">
        <i className=" close icon label-button" onClick={handleDelete} />
        <div className="like-count">
          {props.annotation.likeCount > 0 ? (
            <React.Fragment>
              <em className="user-label-likes">{props.annotation.likeCount}</em>
              <i className="heart icon" />
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UserAnnotationLabel;
