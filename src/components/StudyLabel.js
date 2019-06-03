import React, { Component } from "react";
import { toggleStudy } from "../redux/actions/studiesActions";
import { connect } from "react-redux";

// StudyLabel for displaying studies, allowing subscriptions
// Parent: AnnotationsContainer

class StudyLabel extends Component {
  render() {
    return (
      <div
        className="ui segment annotation-label"
        style={
          this.props.study.highlighted
            ? { color: this.props.study.color }
            : { borderLeft: `2px solid ${this.props.study.color}` }
        }>
        <div className="label-main">
          <h4 className="label-title">{this.props.study.name}</h4>
          {this.props.study.description}
        </div>
        <div className="label-right">
          <div className="like-count">{this.props.study.annotation_count}</div>
          {this.props.study.userSubscribed ? (
            <i className="star icon label-button" onClick={() => this.props.toggleStudy(this.props.study.id, false)} />
          ) : (
            <i
              className="star outline icon label-button"
              onClick={() => this.props.toggleStudy(this.props.study.id, true)}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { toggleStudy: (id, bool) => dispatch(toggleStudy(id, bool)) };
}

export default connect(
  null,
  mapDispatchToProps,
)(StudyLabel);
