import React, { Component } from "react";
import BookContainer from "./BookContainer";
import AnnotationsContainer from "./AnnotationsContainer";
import NavigatorContainer from "./NavigatorContainer";
import { setChunk } from "../redux/actions/currentBookActions";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";

class BookInterface extends Component {
  render() {
    console.log("Interface Rendered");
    return (
      <div className="ui grid">
        <div id="body-row" className="row interface-body">
          <div className="eight wide column book-container">
            <BookContainer />
          </div>
          <div className="eight wide column annotations-container">
            <div className="wrapper">
              <div className="ui grid">
                <div id="navigator" className="row navigator">
                  <NavigatorContainer />
                </div>
                <div id="annotations" className="row annotation-list">
                  <AnnotationsContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentChunk: state.windowStatus.currentChunk };
}

export default connect(mapStateToProps)(BookInterface);
