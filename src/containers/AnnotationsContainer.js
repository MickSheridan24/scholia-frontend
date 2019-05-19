import React, { Component } from "react";
import { connect } from "react-redux";

class AnnotationsContainer extends Component {
  listAnnotations = () => {
    return (
      <div className="ui list">
        {this.props.otherAnnotations.map(a => {
          return (
            <div className="item">
              <div className="ui segment" style={a.highlighted ? { background: "red" } : {}}>
                <h4>{a.title}</h4>
                <p>{a.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return <div>{this.listAnnotations()}</div>;
  }
}

function mapStateToProps(state) {
  return { otherAnnotations: state.otherAnnotations, userAnnotations: state.userAnnotations };
}

export default connect(mapStateToProps)(AnnotationsContainer);
