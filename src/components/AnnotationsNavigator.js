import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setShowOtherAnnotations, setShowUserAnnotations } from "../redux/actions/annotationsActions";

function AnnotationsNavigator(props) {
  function form() {
    return (
      <div className="ui segment">
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
      </div>
    );
  }

  return form();
}
function mapStateToProps(state) {
  return { userShow: state.windowStatus.userShow, otherShow: state.windowStatus.otherShow };
}

function mapDispatchToProps(dispatch) {
  return {
    setShowUserAnnotations: b => dispatch(setShowUserAnnotations(b)),
    setShowOtherAnnotations: b => dispatch(setShowOtherAnnotations(b, dispatch)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationsNavigator);
