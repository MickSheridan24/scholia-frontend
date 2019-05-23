import React, { Component } from "react";
import BookContainer from "./BookContainer";
import AnnotationsContainer from "./AnnotationsContainer";
import NavigatorContainer from "./NavigatorContainer";
import { setChunk } from "../redux/actions/currentBookActions";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";

class BookInterface extends Component {
  handleNavigation = dir => {
    if (dir === "up") {
      if (this.props.currentChunk <= 0) {
        this.scrollToTop();
        this.props.setChunk(0);
      } else {
        this.props.setChunk(this.props.currentChunk - 1);
      }
    } else if (dir === "down") {
      if (this.props.currentChunk >= this.props.book.text.length - 1) {
        this.scrollToBottom();
        this.props.setChunk(this.props.book.text.length - 1);
      } else {
        this.props.setChunk(this.props.currentChunk + 1);
      }
    }
  };

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

function mapDispatchToProps(dispatch) {
  return { setChunk: ind => dispatch(setChunk(ind)) };
}

function mapStateToProps(state) {
  return { currentChunk: state.windowStatus.currentChunk, book: state.currentBook };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookInterface);
