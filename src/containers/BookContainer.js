import React, { Component } from "react";
import { fetchBook } from "../redux/actions/libraryActions";
import { setAnnotations, newAnnotationForm } from "../redux/actions/annotationsActions";
import { setChunk } from "../redux/actions/currentBookActions";
import { connect } from "react-redux";
import BookChunk from "./BookChunk";
import { Element, Events, animateScroll as scroll, scroller } from "react-scroll";

class BookContainer extends Component {
  state = {
    showControls: false,
  };

  componentDidMount() {
    this.props.fetchBook(0);
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
      nextProps.currentChunk !== this.props.currentChunk ||
      nextState !== this.state
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentChunk !== this.props.currentChunk) {
      scroller.scrollTo(`chunk${this.props.currentChunk}`, {
        duration: 100,
        smooth: true,
        isDynamic: true,
      });
    }
  }

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

  handleNavigation = dir => {
    if (dir === "up") {
      if (this.props.currentChunk <= 0) {
        this.scrollToTop();
        this.props.setChunk(0);
      } else {
        this.props.setChunk(this.props.currentChunk - 1);
      }
    } else if (dir === "down") {
      if (this.props.currentChunk >= this.props.book.text.length - 1) {
        this.scrollToBottom();
        this.props.setChunk(this.props.book.text.length - 1);
      } else {
        this.props.setChunk(this.props.currentChunk + 1);
      }
    }
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
    // console.log("Book Container Render");
    return (
      <div>
        <div className="book-controls">
          <div className="ui segment">
            <button onClick={() => this.setState({ showControls: !this.state.showControls })}>
              {this.state.showControls ? "<" : ">"}
            </button>
            {this.state.showControls ? (
              <div>
                <button className="ui button" onClick={() => this.handleNavigation("up")}>
                  Up
                </button>
                <span>Section {this.props.currentChunk + 1}</span>
                <button className="ui button" onClick={() => this.handleNavigation("down")}>
                  Down
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="book-window" id="ScrollContainer" onScroll={this.initiateScroll}>
          <div onDoubleClick={this.handleOnDoubleClick} id="container">
            {this.props.book.text ? this.displayBook() : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.currentBook,
    otherAnnotations: state.otherAnnotations,
    currentChunk: state.windowStatus.currentChunk,
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
