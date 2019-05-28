import React, { Component } from "react";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import Line from "../components/Line";

class BookChunk extends Component {
  displayChunk = () => {
    return this.props.chunk.map((par, i) => {
      return this.displayParagraph(par, i);
    });
  };

  displayParagraph = (par, i) => {
    return (
      //  <LazyLoad once offset={500} key={`par-${i}`} placeholder={<p className="placeholder">...</p>}>
      <p key={`par-${i}`} className="paragraph">
        {par.map((line, ii) => {
          return this.displayLine(line, i, ii);
        })}
      </p>
      //  </LazyLoad>
    );
  };
  displayLine = (line, i, ii) => {
    return <Line key={`line-${i}-${ii}`} firstLine={ii === 0} line={line} />;
  };

  render() {
    return (
      <LazyLoad once offset={500} placeholder={<p className="placeholder">...</p>}>
        <div> {this.displayChunk()}</div>
      </LazyLoad>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { chunk: state.currentBook.text[ownProps.index] };
}

export default connect(mapStateToProps)(BookChunk);
