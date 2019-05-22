import React, { Component } from "react";
import AnnotationsNavigator from "../components/AnnotationsNavigator";
import BookNavigator from "../components/BookNavigator.js";

export default class NavigatorContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="eight wide stretched column">
          <BookNavigator handleNavigation={this.props.handleNavigation} />
        </div>
        <div className="eight wide stretched column">
          <AnnotationsNavigator />
        </div>
      </React.Fragment>
    );
  }
}
