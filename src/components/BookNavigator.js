import React, { Component } from "react";
import { connect } from "react-redux";

class BookNavigator extends Component {
  render() {
    return (
      <div className="book-controls ui segment">
        <button className="ui button" onClick={() => this.props.handleNavigation("up")}>
          Up
        </button>
        <span>Section {this.props.currentChunk + 1}</span>
        <button className="ui button" onClick={() => this.props.handleNavigation("down")}>
          Down
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentChunk: state.windowStatus.currentChunk };
}

export default connect(mapStateToProps)(BookNavigator);
