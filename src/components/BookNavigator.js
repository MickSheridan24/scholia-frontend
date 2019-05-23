import React, { Component } from "react";
import { connect } from "react-redux";

class BookNavigator extends Component {
  render() {
    return (
      <React.Fragment>
        <button className="ui button" onClick={() => this.handleNavigation("up")}>
          Up
        </button>
        <span>Section {this.props.currentChunk + 1}</span>
        <button className="ui button" onClick={() => this.handleNavigation("down")}>
          Down
        </button>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { currentChunk: state.windowStatus.currentChunk };
}

export default connect(mapStateToProps)(BookNavigator);
