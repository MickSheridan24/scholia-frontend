import React, { Component } from "react";
import BookContainer from "./BookContainer";
import AnnotationsContainer from "./AnnotationsContainer";

export default class BookInterface extends Component {
  render() {
    return (
      <div className="ui grid">
        <div className="eight wide column">
          <BookContainer />
        </div>
        <div className="eight wide column">
          <AnnotationsContainer />
        </div>
      </div>
    );
  }
}
