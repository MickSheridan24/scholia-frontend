import React, { Component } from "react";
import { fetchBook } from "../redux/actions/libraryActions";
import { setAnnotations, postAnnotation } from "../redux/actions/annotationsActions";
import { setScrolling } from "../redux/actions/bookWindowActions";
import { connect } from "react-redux";

class BookContainer extends Component {
  componentDidMount() {
    this.props.fetchBook(0);
  }

  handleOnDoubleClick = e => {
    e.persist();
    if (e.target.classList.contains("line") || e.target.classList.contains("first-line")) {
      const sel = document.getSelection();

      sel.setBaseAndExtent(e.target, 0, sel.focusNode, sel.focusOffset);
      let targetString = sel.toString().replace("*", "");
      let target = targetString.length;
      let lineId = e.target.children.lineIndex.dataset.index;
      this.props.postAnnotation({ pIndex: lineId, charIndex: target, text: "THIS IS A TEST" });
    }
  };

  displayBook = () => {
    return this.props.book.text.map((par, i) => {
      return this.displayParagraph(par, i);
    });
  };
  displayParagraph = (par, i) => {
    return (
      <p
        key={`par-${i}`}
        style={{
          color: `rgb(${Math.floor(Math.random() * 230)}, ${Math.floor(Math.random() * 230)}, ${Math.floor(
            Math.random() * 230,
          )}`,
        }}
        className="paragraph">
        {par.map((line, ii) => {
          return this.displayLine(line, i, ii);
        })}
      </p>
    );
  };
  displayLine = (line, i, ii) => {
    return (
      <span key={`line-${i}-${ii}`} className={ii === 0 ? "first-line" : "line"}>
        {line.map(segment => {
          return segment;
        })}
      </span>
    );
  };

  render() {
    console.log("Render");
    return (
      <div className="book-window" id="ScrollContainer" onScroll={this.initiateScroll}>
        <p>{this.props.book.title}</p>
        <p>{this.props.book.author}</p>
        <div onDoubleClick={this.handleOnDoubleClick} id="container">
          {this.props.book.text ? this.displayBook() : null}{" "}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { book: state.currentBook, otherAnnotations: state.otherAnnotations };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchBook: id => dispatch(fetchBook(id)),
    setAnnotations: query => dispatch(setAnnotations(query)),
    postAnnotation: args => dispatch(postAnnotation(args)),
    setScrolling: () => dispatch(setScrolling(true)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookContainer);
