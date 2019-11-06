import React from "react";
import { connect } from "react-redux";

import {
  setShowOtherAnnotations,
  setShowUserAnnotations,
  toggleAll,
  setStudiesList,
} from "../redux/actions/annotationsActions";

// AnnotationsNavigator contains buttons for toggling annotations in container
// Parent: NavigatorContainer

function AnnotationsNavigator(props) {
  const handleToggle = () => {
    props.toggleAll();
  };
  function form() {
    return (
      <React.Fragment>
        <div className="filter-widget-container">
          <div className="filter-widget">
            <div className="annotation-filters">
              <div className="ui checkbox annotation-filter">
                <input
                  id="toggle-all-input"
                  className="toggle-all-box"
                  type="checkbox"
                  name="toggleAll"
                  checked={!props.allToggle}
                  onChange={handleToggle}
                />
                <label />
              </div>
              <div className="annotation-filter-label">Notes In View</div>
            </div>
          </div>
          <div className="filter-widget">
            <div className="annotation-filters">
              <div className="ui checkbox annotation-filter">
                <input
                  type="checkbox"
                  className="filter-box"
                  checked={!props.userShow}
                  onChange={() => props.setShowUserAnnotations(!props.userShow)}
                />
                <label />
              </div>
              <div className="annotation-filter-label">Exclude My Notes</div>
            </div>
          </div>
        </div>
        <div className="filter-widget-container">
          <div className="filter-widget">
            <div className="annotation-filters">
              <div className="ui checkbox annotation-filter">
                <input
                  type="checkbox"
                  className="filter-box"
                  checked={props.studiesList}
                  onChange={() => props.setStudiesList(!props.studiesList)}
                />
                <label />
              </div>
              <div className="annotation-filter-label">Select Studies</div>
            </div>
          </div>
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
    studiesList: state.windowStatus.studiesList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setShowUserAnnotations: b => dispatch(setShowUserAnnotations(b)),
    setShowOtherAnnotations: b => dispatch(setShowOtherAnnotations(b, dispatch)),
    toggleAll: () => dispatch(toggleAll()),
    setStudiesList: b => dispatch(setStudiesList(b)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnotationsNavigator);
