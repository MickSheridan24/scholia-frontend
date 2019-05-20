import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <div className="ui segment navbar ">
        <Link style={{ color: "beige" }} to="/home">
          Home
        </Link>
        <Link style={{ color: "beige" }} to="/book">
          Books!
        </Link>
        <Link style={{ color: "beige" }} to="/annotations">
          Annotations!
        </Link>
        <Link
          style={{ color: "beige" }}
          to="/home"
          onClick={() => {
            localStorage.clear();
            this.props.logout();
          }}>
          Logout
        </Link>
      </div>
    );
  }
}
///MAP DISPATCH TO PROPS
