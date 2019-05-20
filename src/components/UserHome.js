import React, { Component } from "react";
import { connect } from "react-redux";

class UserHome extends Component {
  render() {
    return <div>Hello, {this.props.user.username}</div>;
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(UserHome);
