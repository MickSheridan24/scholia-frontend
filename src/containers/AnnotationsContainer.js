import React, { Component } from "react";
import { connect } from "react-redux";
import AnnotationForm from "../components/AnnotationForm";
import AnnotationLabel from "../components/AnnotationLabel";
import AnnotationsNavigator from "../components/AnnotationsNavigator";

class AnnotationsContainer extends Component {
  constructor() {
    super();
    this.state = {
      allAnnotations: false,
    };
  }

  listAnnotations = () => {
    let annotations = this.props.otherAnnotations.reduce((memo, anno) => {
      if (
        (this.props.userShow && anno.user_id === this.props.user.id) ||
        (this.props.otherShow && anno.user_id !== this.props.user.id)
      ) {
        return [...memo, anno];
      } else return memo;
    }, []);
    const filteredAnnotations = this.state.allAnnotations ? annotations : annotations.filter(a => a.visible);

    const visibleAnnotations = filteredAnnotations
      .reverse()
      .sort((l, h) => parseInt(l.location_p_index) - parseInt(h.location_p_index));

    return (
      <div className="ui list">
        {visibleAnnotations.map(a => {
          return <AnnotationLabel key={`anno -label - ${a.id}`} annotation={a} />;
        })}
      </div>
    );
  };

  handleToggle = () => {
    this.setState({ allAnnotations: !this.state.allAnnotations });
  };
  render() {
    // console.log(this.props.userAnnotations, this.props.otherAnnotations);
    // console.log("Annotations  Container Rendered");
    return (
      <div className="annotationContainer">
        <AnnotationForm />
        <AnnotationsNavigator />
        <div className="annotationList">
          <div className="ui toggle checkbox" onClick={this.handleToggle}>
            <input type="checkbox" name="toggleAll" checked={this.state.allAnnotations} onChange={this.handleToggle} />
            <label>{this.state.allAnnotations ? "All" : "On Page"}</label>
          </div>
          {this.listAnnotations()}
        </div>
      </div>
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
  };
}

export default connect(mapStateToProps)(AnnotationsContainer);
