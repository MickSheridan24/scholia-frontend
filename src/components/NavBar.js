import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <Link to="/bookContainer">Books!</Link>
        <Link to="/annotations">Annotations!</Link>
      </div>
    );
  }
}
