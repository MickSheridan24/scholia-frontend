import React from "react";
import { connect } from "react-redux";

function Line(props) {
  function lineString() {
    return props.line.reduce((memo, str) => {
      return str.props.children ? memo + str.props.children : memo;
    }, "");
  }
  const line = lineString();
  function isAuthor() {
    const authorString = `by ${props.author}`;
    return line.toLowerCase() === authorString.toLowerCase();
  }
  function isTitle() {
    return line === line.toUpperCase() && line.toUpperCase() === props.title.toUpperCase();
  }
  function isGutenberg() {
    return lineString()
      .toLowerCase()
      .includes("project gutenberg");
  }
  function isSelected() {
    const ind = parseInt(props.line[props.line.length - 1].props["data-index"]);
    return props.selected.index && ind === parseInt(props.selected.index);
  }

  function getClassNames() {
    let ret = "";
    ret += isTitle() ? "title " : isAuthor() ? "author " : props.firstLine ? "first-line " : "line ";
    return ret;
  }
  function displaySegments() {
    return props.line.map(segment => {
      return segment;
    });
  }
  if (isGutenberg()) {
    return null;
  } else {
    return <span className={getClassNames()}>{displaySegments()}</span>;
  }
}

function mapStateToProps(state) {
  return {
    author: state.currentBook.author,
    title: state.currentBook.title,
    selected: state.windowStatus.selectedLine,
  };
}

export default connect(mapStateToProps)(Line);

// else if (isSelected()) {
//   return (
//     <span className={getClassNames()}>
//       <span className="selected-line">{displaySegments()}</span>
//     </span>
//   );
