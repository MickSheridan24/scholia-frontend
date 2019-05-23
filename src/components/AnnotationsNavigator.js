import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setShowOtherAnnotations, setShowUserAnnotations, toggleAll } from "../redux/actions/annotationsActions";

function AnnotationsNavigator(props) {
  const handleToggle = () => {
    props.toggleAll();
  };
  function form() {
    return (
      <React.Fragment>
        <input
          type="checkbox"
          name={"checkUsers"}
          checked={props.userShow}
          onChange={() => {
            props.setShowUserAnnotations(!props.userShow);
          }}
        />
        <label>My Annotations</label>
        <input
          type="checkbox"
          name={"checkOthers"}
          checked={props.otherShow}
          onChange={() => {
            props.setShowOtherAnnotations(!props.otherShow);
          }}
        />
        <label>Other Annotations</label>
        <div className="ui toggle checkbox">
          <input type="checkbox" name="toggleAll" checked={props.allToggle} onChange={handleToggle} />
          <label>Show All</label>
        </div>
      </React.Fragment>
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
