import React, { useState } from "react";
import { connect } from "react-redux";
import { postAnnotation } from "../redux/actions/annotationsActions";

function AnnotationForm(props) {
  const [title, setTitle] = useState("Title");
  const [body, setBody] = useState("");
  console.log("Annotation Form Rendering");
  return props.args ? (
    <div>
      <h4>New Annotation:</h4>
      <form
        onSubmit={e => {
          e.preventDefault();
          const args = {
            pIndex: props.args.pIndex,
            charIndex: props.args.charIndex,
            title: e.currentTarget.elements.title.value,
            body: e.currentTarget.elements.body.value,
          };
          props.postAnnotation(args);
          setTitle("Title");
          setBody("");
        }}>
        <label>Title</label>
        <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
        <label>Content</label>
        <textarea type="text" name="body" value={body} onChange={e => setBody(e.target.value)} />
        <input type="submit" />
      </form>
    </div>
  ) : null;
}
function mapStateToProps(state) {
  return { args: state.windowStatus.annotationForm };
}

function mapDispatchToProps(dispatch) {
  return { postAnnotation: args => dispatch(postAnnotation(args)) };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationForm);
