import React, { useState } from "react";
import { connect } from "react-redux";
import { postAnnotation, cancelAnnotationForm } from "../redux/actions/annotationsActions";

function AnnotationForm(props) {
  const [title, setTitle] = useState("Title");
  const [body, setBody] = useState("");
  const [color, setColor] = useState("blue");
  const [study, setStudy] = useState(0);
  // console.log("Annotation Form Rendering");

  const colorSelect = () => {
    return (
      <React.Fragment>
        <label className="annotation-form-label">Color</label>
        <select
          className="annotation-form-color-select"
          name="color"
          value={color}
          onChange={e => setColor(e.target.value)}>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
          <option value="turquoise">Turquoise</option>
        </select>
      </React.Fragment>
    );
  };
  return props.args ? (
    <div className="annotation-form">
      <h4>New Annotation:</h4>
      <form
        onSubmit={e => {
          e.preventDefault();
          const selectedStudy = props.studies.find(s => parseInt(s.id) === parseInt(study));
          const args = {
            pIndex: props.args.pIndex,
            charIndex: props.args.charIndex,
            title: e.currentTarget.elements.title.value,
            body: e.currentTarget.elements.body.value,
            color: selectedStudy ? selectedStudy.color : color,
            study_id: study,
          };
          props.postAnnotation(args);
          setTitle("Title");
          setBody("");
        }}
        className="annotation-form-tags">
        <label className="annotation-form-label">Title</label>
        <input
          className="annotation-form-input"
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label className="annotation-form-color-select">Study-Group</label>
        <select
          name="study"
          className="annotation-form-color-select"
          value={study}
          onChange={e => setStudy(e.target.value)}>
          <option value={0}>None</option>
          {props.studies.map(s => {
            return <option value={s.id}>{s.name}</option>;
          })}
        </select>

        {parseInt(study) === 0 ? colorSelect() : null}
        <label className="annotation-form-label">Content</label>

        <textarea
          className="annotation-form-body"
          type="text"
          name="body"
          value={body}
          style={{ width: 400, fontSize: 12 }}
          rows="15"
          onChange={e => setBody(e.target.value)}
        />
        <br />
        <input type="submit" />
        <button onClick={props.cancelAnnotationForm}>Cancel</button>
      </form>
    </div>
  ) : null;
}
function mapStateToProps(state) {
  return { args: state.windowStatus.annotationForm, studies: state.studies };
}

function mapDispatchToProps(dispatch) {
  return {
    postAnnotation: args => dispatch(postAnnotation(args)),
    cancelAnnotationForm: () => dispatch(cancelAnnotationForm()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationForm);
