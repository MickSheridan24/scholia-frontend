import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="ui simple dropdown item " id="nav-bar">
          <i className="large compass outline icon" menu />
          <div className="menu">
            <Link className="item" to="/home">
              Home
            </Link>
            <Link className="item" to="/book">
              Current Book
            </Link>
            <Link className="item" to="/search">
              Search Library
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
