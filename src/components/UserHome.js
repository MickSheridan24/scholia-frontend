import React, { Component } from "react";
import { connect } from "react-redux";
import LibraryContainer from "../containers/LibraryContainer";
import NavBar from "./NavBar";
import UserAnnotationsContainer from "../containers/UserAnnotationsContainer";

class UserHome extends Component {
  render() {
    return (
      <div className="home-container">
        <NavBar />
        <div className="home-greeting">Hello, {this.props.user.username}</div>
        <LibraryContainer />
        <UserAnnotationsContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(UserHome);
