import React from "react";

export default function Line(props) {
  return (
    <span className={props.index === 0 ? "first-line" : "line"}>
      {props.line.map(segment => {
        return segment;
      })}
    </span>
  );
}
