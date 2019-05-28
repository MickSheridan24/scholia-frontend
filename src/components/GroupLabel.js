import React, { Component } from "react";

class GroupLabel extends Component {
  render() {
    return (
      <div
        className="ui segment annotation-label"
        style={
          this.props.group.highlighted
            ? { color: this.props.group.color }
            : { "border-left": `2px solid ${this.props.group.color}` }
        }>
        <div className="label-main">
          <h4 className="label-title">{this.props.group.name}</h4>
          {this.props.group.description}
        </div>
        <div className="label-right" />
      </div>
    );
  }
}

export default GroupLabel;
