import React, { useState } from "react";
import { connect } from "react-redux";
import { updateAnnotation } from "../redux/actions/annotationsActions";

function EditAnnotationLabel(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  const handleSubmit = e => {
    props.updateAnnotation({ title: title, body: body, id: props.id });
    props.handleCancelEdit();
  };

  return (
    <div className="ui segment annotation-label-edit">
      <div className="label-main edit">
        <input className="label-title edit" type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea rows="15" className="annotation-form-body" value={body} onChange={e => setBody(e.target.value)}>
          {body}
        </textarea>
      </div>
      <div className="label-right edit">
        <i className=" checkmark icon label-button" onClick={handleSubmit} />
        <i className=" ban icon label-button" onClick={props.handleCancelEdit} />
      </div>
    </div>
  );
}

function mapDispatch(dispatch) {
  return { updateAnnotation: args => dispatch(updateAnnotation(args)) };
}

export default connect(
  null,
  mapDispatch,
)(EditAnnotationLabel);
