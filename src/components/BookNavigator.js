import React, { Component } from "react";
import { connect } from "react-redux";
import { setChunk } from "../redux/actions/currentBookActions";

class BookNavigator extends Component {
  handleNavigation = dir => {
    if (dir === "up") {
      if (this.props.currentChunk <= -1) {
        this.props.setChunk(-1);
      } else {
        this.props.setChunk(this.props.currentChunk - 1);
      }
    } else if (dir === "down") {
      if (this.props.currentChunk > this.props.book.text.length) {
        this.props.setChunk(this.props.book.text.length);
      } else {
        this.props.setChunk(this.props.currentChunk + 1);
      }
    }
  };

  render() {
    return (
      <div className="book-navigator">
        <div className="navigator-arrow">
          <i className="arrow up icon" onClick={() => this.handleNavigation("up")} />
        </div>
        <div className="section-indicator">{this.props.currentChunk + 1}</div>
        <div className="navigator-arrow">
          <i className="arrow down icon" onClick={() => this.handleNavigation("down")} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentChunk: state.windowStatus.currentChunk, book: state.currentBook };
}
function mapDispatchToProps(dispatch) {
  return { setChunk: ind => dispatch(setChunk(ind)) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookNavigator);
