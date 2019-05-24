import React, { Component } from "react";
import AnnotationsNavigator from "../components/AnnotationsNavigator";
import BookNavigator from "../components/BookNavigator.js";
import NavBar from "../components/NavBar";

export default class NavigatorContainer extends Component {
  render() {
    return (
      <div className="navigator-container">
        <BookNavigator handleNavigation={this.props.handleNavigation} />
        <AnnotationsNavigator />
        <NavBar />
      </div>
    );
  }
}

//
//
