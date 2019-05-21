import React, { Component } from "react";
import { connect } from "react-redux";
import AnnotationForm from "../components/AnnotationForm";
import AnnotationLabel from "../components/AnnotationLabel";

class AnnotationsContainer extends Component {
  listAnnotations = () => {
    const visibleAnnotations = this.props.otherAnnotations
      .filter(a => a.visible)
      .reverse()
      .sort((l, h) => parseInt(l.location_p_index) - parseInt(h.location_p_index));

    return (
      <div className="ui list">
        {visibleAnnotations.map(a => {
          return <AnnotationLabel key={`label - ${a.id}`} annotation={a} />;
        })}
      </div>
    );
  };

  render() {
    // console.log("Annotations  Container Rendered");
    return (
      <div className="annotationContainer">
        <AnnotationForm />
        <div className="annotationList">{this.listAnnotations()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    otherAnnotations: state.otherAnnotations,
    userAnnotations: state.userAnnotations,
    windowStatus: state.windowStatus,
  };
}

export default connect(mapStateToProps)(AnnotationsContainer);
