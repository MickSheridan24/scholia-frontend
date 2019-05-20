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
    return (
      <h2 className="title">
        {props.line.map(segment => {
          return segment;
        })}
      </h2>
    );
  }
  function lineTag() {
    return (
      <span className={props.firstLine ? "first-line" : "line"}>
        {props.line.map(segment => {
          return segment;
        })}
      </span>
    );
  }
  function authorTag() {
    return (
      <h4 className="author">
        {props.line.map(segment => {
          return segment;
        })}
      </h4>
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
