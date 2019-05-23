import React, { Component } from "react";
import AnnotationsNavigator from "../components/AnnotationsNavigator";
import BookNavigator from "../components/BookNavigator.js";
import NavBar from "../components/NavBar";

export default class NavigatorContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <BookNavigator handleNavigation={this.props.handleNavigation} />
        <NavBar />
        <AnnotationsNavigator />
      </React.Fragment>
    );
  }
}
