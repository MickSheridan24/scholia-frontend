import React, { useState } from "react";
import { connect } from "react-redux";
import { postAnnotation, cancelAnnotationForm } from "../redux/actions/annotationsActions";

// Annotation form for the creation of new Annotations
// Parent: AnnotationsContainer

class AnnotationForm extends React.Component {
  state = {
    title: "",
    body: "",
    color: "blue",
    study: 0,
  };

  handleSubmit = e => {
    e.preventDefault();
    const selectedStudy = this.props.studies.find(s => parseInt(s.id) === parseInt(this.state.study));
    const args = {
      pIndex: this.props.args.pIndex,
      charIndex: this.props.args.charIndex,
      title: e.currentTarget.elements.title.value,
      body: e.currentTarget.elements.body.value,
      color: selectedStudy ? selectedStudy.color : this.state.color,
      study_id: this.state.study,
    };
    this.props.postAnnotation(args);
    this.setState({ title: "Title" });
    this.setState({ body: "" });
  };
  colorSelect = () => {
    console.log("Form Rendered");
    return (
      <React.Fragment>
        <label className="annotation-form-label">Color</label>
        <select
          className="annotation-form-color-select"
          name="color"
          value={this.state.color}
          onChange={e => this.setState({ color: e.target.value })}>
          <option key="blue" value="blue">
            Blue
          </option>
          <option key="red" value="red">
            Red
          </option>
          <option key="green" value="green">
            Green
          </option>
          <option key="purple" value="purple">
            Purple
          </option>
          <option key="teal" value="teal">
            Teal
          </option>
        </select>
      </React.Fragment>
    );
  };
  render() {
    return this.props.args ? (
      <div className="annotation-form">
        <div className="annotation-form-header">New Annotation:</div>
        <form onSubmit={this.handleSubmit} className="annotation-form-tags">
          <label className="annotation-form-label">Title</label>
          <input
            className="annotation-form-input"
            type="text"
            name="title"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />

          <label className="annotation-form-label">Study-Group</label>
          <select
            name="study"
            className="annotation-form-color-select"
            value={this.state.study}
            onChange={e => this.setState({ study: e.target.value })}>
            <option value={0}>None</option>
            {this.props.studies.map(s => {
              return (
                <option key={`study-select${s.id}`} value={s.id}>
                  {s.name}
                </option>
              );
            })}
          </select>

          {parseInt(this.state.study) === 0 ? this.colorSelect() : null}
          <label className="annotation-form-label">Content</label>

          <textarea
            className="annotation-form-body"
            type="text"
            name="body"
            value={this.state.body}
            style={{ width: 400, fontSize: 12 }}
            rows="15"
            onChange={e => this.setState({ body: e.target.value })}
          />
          <br />
          <input className="annotation-form-button" type="submit" />
          <button className="annotation-form-button" onClick={this.props.cancelAnnotationForm}>
            Cancel
          </button>
        </form>
      </div>
    ) : null;
  }
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
