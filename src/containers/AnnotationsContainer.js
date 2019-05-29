import React, { Component } from "react";
import { connect } from "react-redux";
import AnnotationForm from "../components/AnnotationForm";
import AnnotationLabel from "../components/AnnotationLabel";
import StudyLabel from "../components/StudyLabel";

class AnnotationsContainer extends Component {
  listOtherAnnotations = () => {
    let annotations = this.props.otherAnnotations.reduce((memo, anno) => {
      const study = this.props.studies.find(s => s.id === anno.study_id);
      if (
        ((this.props.userShow && anno.user_id === this.props.user.id) ||
          (this.props.otherShow && anno.user_id !== this.props.user.id)) &&
        (!anno.study || (study && study.userSubscribed))
      ) {
        return [...memo, anno];
      } else return memo;
    }, []);
    const filteredAnnotations = this.props.allToggle ? annotations : annotations.filter(a => a.visible);

    const visibleAnnotations = filteredAnnotations
      .reverse()
      .sort((l, h) => parseInt(l.location_p_index) - parseInt(h.location_p_index));

    return visibleAnnotations.map(a => {
      return <AnnotationLabel key={`anno -label - ${a.id}`} annotation={a} />;
    });
  };
  listUserAnnotations = () => {
    return this.props.userAnnotations.map(a => {
      return <AnnotationLabel home={this.props.home} key={`anno -label - ${a.id}`} annotation={a} />;
    });
  };

  listGroups = () => {
    return this.props.studies.map(g => {
      return <StudyLabel key={`study-label-${g.id}`} study={g} />;
    });
  };

  render() {
    // console.log(this.props.userAnnotations, this.props.otherAnnotations);
    // console.log("Annotations  Container Rendered");
    return (
      <React.Fragment>
        {this.props.annotationForm ? (
          <AnnotationForm />
        ) : this.props.studiesList ? (
          this.listGroups()
        ) : (
          this.listOtherAnnotations()
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    otherAnnotations: state.otherAnnotations,
    userAnnotations: state.userAnnotations,
    userShow: state.windowStatus.userShow,
    otherShow: state.windowStatus.otherShow,
    windowStatus: state.windowStatus,
    user: state.user,
    allToggle: state.windowStatus.allToggle,
    annotationForm: state.windowStatus.annotationForm,
    studies: state.studies,
    studiesList: state.windowStatus.studiesList,
  };
}

export default connect(mapStateToProps)(AnnotationsContainer);
