import React, { Component } from "react";
import { fetchBook } from "../redux/actions/libraryActions";
import { setAnnotations, newAnnotationForm } from "../redux/actions/annotationsActions";
import { setChunk } from "../redux/actions/currentBookActions";
import { connect } from "react-redux";
import BookChunk from "./BookChunk";

import { Element, Events, animateScroll as scroll, scroller } from "react-scroll";

class BookContainer extends Component {
  componentDidMount() {
    if (this.props.linkId) {
      this.props.fetchBook(this.props.linkId);
    }
    Events.scrollEvent.register("begin", function(to, element) {
      console.log("begin", arguments);
    });
    Events.scrollEvent.register("end", function(to, element) {
      console.log("end", arguments);
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.book !== this.props.book ||
      nextProps.loading !== this.props.loading ||
      nextProps.currentChunk !== this.props.currentChunk ||
      nextState !== this.state
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate = async prevProps => {
    if (prevProps.currentChunk < this.props.currentChunk) {
      for (let chunk = parseInt(prevProps.currentChunk); chunk < parseInt(this.props.currentChunk); chunk++) {
        console.log("Scrolling", chunk + 1);
        scroller.scrollTo(`chunk${chunk + 1}`, {
          duration: 100,
          smooth: true,
          isDynamic: true,
        });
        await new Promise((res, rej) => {
          setTimeout(() => {
            console.log("waited");
            res();
          }, 150);
        });
      }
    } else if (prevProps.currentChunk > this.props.currentChunk) {
      for (let chunk = parseInt(this.props.currentChunk); chunk > parseInt(prevProps.currentChunk); chunk--) {
        console.log("Scrolling", chunk - 1);
        scroller.scrollTo(`chunk${chunk - 1}`, {
          duration: 100,
          smooth: true,
          isDynamic: true,
        });
        await new Promise((res, rej) => {
          setTimeout(() => {
            console.log("waited");
            res();
          }, 150);
        });
      }
    }
  };

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }
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
    console.log("Book Container Render");
    return (
      <React.Fragment>
        <div onDoubleClick={this.handleOnDoubleClick} className="book-text" id="container">
          {this.props.book.text && !this.props.loading ? (
            this.displayBook()
          ) : (
            <div className="loading-screen">Retrieving...</div>
          )}
        </div>
      </React.Fragment>
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
