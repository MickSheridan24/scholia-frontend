import React, { useState } from "react";
import { connect } from "react-redux";
import { updateAnnotation } from "../redux/actions/annotationsActions";

function EditAnnotationForm(props) {
  debugger;
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  if (props.postEdit) {
    props.updateAnnotation({ title: title, body: body });
    props.setPostEdit(false);
    return null;
  } else {
    return (
      <div>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea value={body} onChange={e => setBody(e.target.value)}>
          {body}
        </textarea>
      </div>
    );
  }
}
function mapDispatch(dispatch) {
  return { updateAnnotation: args => dispatch(updateAnnotation) };
}

export default connect(
  null,
  mapDispatch,
)(EditAnnotationForm);
