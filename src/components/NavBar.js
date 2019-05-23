import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="ui simple dropdown item">
          <i className="large compass outline icon" />
          <div className="menu">
            <Link className="item" to="/home">
              Home
            </Link>
            <Link className="item" to="/book">
              Books!
            </Link>
            <Link className="item" to="/annotations">
              Annotations!
            </Link>
            <Link
              className="item"
              to="/home"
              onClick={() => {
                localStorage.clear();
                this.props.logout();
              }}>
              Logout
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
///MAP DISPATCH TO PROPS
