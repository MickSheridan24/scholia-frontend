import React, { Component } from "react";
import { fetchBook } from "../redux/actions/libraryActions";
import { setAnnotations, newAnnotationForm } from "../redux/actions/annotationsActions";
import { setChunk } from "../redux/actions/currentBookActions";
import { connect } from "react-redux";
import BookChunk from "./BookChunk";
import { Element, animateScroll as scroll, scroller } from "react-scroll";

// BookContainer for holding the text
// Parent: BookInterface

class BookContainer extends Component {
  componentDidMount() {
    if (this.props.linkId) {
      this.props.fetchBook(this.props.linkId);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      (nextProps.book.text && nextProps.book.text.length) !== (this.props.book.text && this.props.book.text.length) ||
      nextProps.loading !== this.props.loading ||
      nextProps.currentChunk !== this.props.currentChunk
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate = async prevProps => {
    if (prevProps.currentChunk !== this.props.currentChunk) {
      if (this.props.currentChunk === -1) {
        this.props.setChunk(0);
      } else if (this.props.currentChunk === this.props.book.text.length) {
        this.props.setChunk(this.props.currentChunk - 1);
        this.scrollToBottom();
      }
      scroller.scrollTo(`chunk${this.props.currentChunk}`, {
        duration: 200,
        smooth: true,
        isDynamic: true,
      });
    }
  };

  scrollToBottom = () => {
    scroll.scrollToBottom();
  };
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  handleOnDoubleClick = e => {
    e.persist();
    if (e.target.classList.contains("line") || e.target.classList.contains("first-line")) {
      const sel = document.getSelection();

      sel.setBaseAndExtent(e.target, 0, sel.focusNode, sel.focusOffset);
      let targetString = sel.toString().replace("*", "");
      let target = targetString.length;
      let lineId = e.target.children.lineIndex.dataset.index;
      this.props.newAnnotationForm({ charIndex: target, pIndex: lineId });
    }
  };

  displayBook = () => {
    // console.log("book Display");
    return this.props.book.text.map((ch, i) => {
      return (
        <Element key={`chunk${i}`} name={`chunk${i}`}>
          <BookChunk index={i} />
        </Element>
      );
    });
  };

  render() {
    return (
      <div onDoubleClick={this.handleOnDoubleClick} className="book-text" id="container">
        {this.props.book.text && !this.props.loading ? (
          this.displayBook()
        ) : (
          <div className="loading-screen">Retrieving...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.currentBook,
    otherAnnotations: state.otherAnnotations,
    currentChunk: state.windowStatus.currentChunk,
    loading: state.windowStatus.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchBook: id => dispatch(fetchBook(id)),
    setAnnotations: query => dispatch(setAnnotations(query)),
    newAnnotationForm: args => dispatch(newAnnotationForm(args)),
    setChunk: ind => dispatch(setChunk(ind)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookContainer);
