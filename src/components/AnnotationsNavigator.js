import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setShowOtherAnnotations, setShowUserAnnotations, toggleAll } from "../redux/actions/annotationsActions";

function AnnotationsNavigator(props) {
  const handleToggle = () => {
    props.toggleAll();
  };
  function form() {
    return (
      <div className="filter-widget-container">
        <div className="filter-widget">
          <div className="annotation-filters">
            <div className="ui checkbox annotation-filter">
              <input
                id="toggle-all-input"
                className="toggle-all-box"
                type="checkbox"
                name="toggleAll"
                checked={props.allToggle}
                onChange={handleToggle}
              />
              <label />
            </div>
            <div className="annotation-filter-label">Show All Notes</div>
          </div>
          <div className="filter-widget" />
          <div className="annotation-filters">
            <div className="ui checkbox annotation-filter">
              <input
                type="checkbox"
                className="filter-box"
                checked={props.userShow}
                onChange={() => props.setShowUserAnnotations(!props.userShow)}
              />
              <label />
            </div>
            <div className="annotation-filter-label">Include My Notes</div>
          </div>
        </div>
      </div>
    );
  }

  return form();
}
function mapStateToProps(state) {
  return {
    userShow: state.windowStatus.userShow,
    otherShow: state.windowStatus.otherShow,
    allToggle: state.windowStatus.allToggle,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setShowUserAnnotations: b => dispatch(setShowUserAnnotations(b)),
    setShowOtherAnnotations: b => dispatch(setShowOtherAnnotations(b, dispatch)),
    toggleAll: () => dispatch(toggleAll()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationsNavigator);
