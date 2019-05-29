import React, { Component } from "react";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import Line from "../components/Line";

class BookChunk extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.chunk !== nextProps.chunk;
  }
  displayChunk = () => {
    return this.props.chunk.map((par, i) => {
      return this.displayParagraph(par, i);
    });
  };

  displayParagraph = (par, i) => {
    return (
      <div key={`par-${i}`} className="paragraph">
        {par.map((line, ii) => {
          return this.displayLine(line, i, ii);
        })}
      </div>
    );
  };
  displayLine = (line, i, ii) => {
    return <Line key={`line-${i}-${ii}`} firstLine={ii === 0} line={line} />;
  };

  render() {
    console.log("Chunk Render");
    return (
      //<LazyLoad offset={1000}>
      <div> {this.displayChunk()}</div>
      //</LazyLoad>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { chunk: state.currentBook.text[ownProps.index], currentChunk: state.windowStatus.currentChunk };
}

export default connect(mapStateToProps)(BookChunk);
