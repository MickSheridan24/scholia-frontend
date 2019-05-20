import React from "react";
import { connect } from "react-redux";

function Line(props) {
  function lineString() {
    return props.line.reduce((memo, str) => {
      return str.props.children ? memo + str.props.children : memo;
    }, "");
  }
  function isAuthor(props) {
    const authorString = `by ${props.author}`;
    return lineString().toLowerCase() === authorString.toLowerCase();
  }
  function isTitle() {
    return lineString() === lineString().toUpperCase();
  }
  function isGutenberg() {
    return lineString()
      .toLowerCase()
      .includes("project gutenberg");
  }
  function titleTag() {
    console.log("Title Rendered");
    return (
      <span className="title">
        {props.line.map(segment => {
          return segment;
        })}
      </span>
    );
  }
  function lineTag() {
    console.log("Line Rendered");
    return (
      <span className={props.firstLine ? "first-line" : "line"}>
        {props.line.map(segment => {
          return segment;
        })}
      </span>
    );
  }
  function authorTag() {
    console.log("Author Rendered");
    return (
      <span className="author">
        {props.line.map(segment => {
          return segment;
        })}
      </span>
    );
  }
  if (isGutenberg()) {
    return null;
  } else {
    return isTitle(props) ? titleTag() : isAuthor(props) ? authorTag() : lineTag();
  }
}

function mapStateToProps(state) {
  return { author: state.currentBook.author };
}

export default connect(mapStateToProps)(Line);
