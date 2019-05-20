import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="ui menu">
          <Link to="/home">Home</Link>
          <Link to="/bookContainer">Books!</Link>
          <Link to="/annotations">Annotations!</Link>
        </div>
      </div>
    );
  }
}
