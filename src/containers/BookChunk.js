import React, { Component } from "react";
import { connect } from "react-redux";
import Line from "../components/Line";

// BookChunk for displaying and updating individual parts of a book (currently 2000 lines)
// Parent: BookContainer

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
    return <div> {this.displayChunk()}</div>;
  }
}

function mapStateToProps(state, ownProps) {
  return { chunk: state.currentBook.text[ownProps.index], currentChunk: state.windowStatus.currentChunk };
}

export default connect(mapStateToProps)(BookChunk);
