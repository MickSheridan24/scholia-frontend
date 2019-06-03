import React, { Component } from "react";
import { connect } from "react-redux";
import LibraryContainer from "../containers/LibraryContainer";
import NavBar from "./NavBar";
import UserAnnotationsContainer from "../containers/UserAnnotationsContainer";
import { fetchUserAnnotations } from "../redux/actions/annotationsActions";

// UserHome for displaying the current user's info
// Parent: App

class UserHome extends Component {
  componentDidMount() {
    this.props.fetchUserAnnotations();
  }
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

function mapDispatchToProps(dispatch) {
  return { fetchUserAnnotations: () => dispatch(fetchUserAnnotations()) };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserHome);
