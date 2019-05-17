import React, { Component } from "react";
import { fetchBook } from "../redux/actions/libraryActions";
import { setAnnotations } from "../redux/actions/annotationsActions";
import { connect } from "react-redux";

class BookContainer extends Component {
  componentDidMount() {
    this.props.fetchBook(0);
  }

  displayBook = () => {
    return this.props.book.text.map(par => {
      return <p className="paragraph">{this.interpretParagraph(par)}</p>;
    });
  };

  interpretParagraph = par => {
    const lineBreaks = (
      <React.Fragment>
        {par.split("\r\n").map((p, i) => (
          <span className={i === 0 ? "first-line" : "line"}>{this.withEm(p)}</span>
        ))}
      </React.Fragment>
    );
    return lineBreaks;
  };
  withEm = par => {
    const withEm = (
      <React.Fragment>
        {par.split("_").map((par, ind) => {
          if (ind % 2 === 0) {
            return <React.Fragment>{par}</React.Fragment>;
          } else {
            return <span className="italicize">{par}</span>;
          }
        })}
      </React.Fragment>
    );

    // par.replace(/_.*?_/g, substr => {
    //   return `${<span style={{ color: "red" }}>{substr.replace(/_/g, "")}</span>}`;
    // });

    return withEm;
  };

  render() {
    return (
      <div onClick={this.props.setAnnotations}>
        <p>{this.props.book.title}</p>
        <p>{this.props.book.author}</p>
        <div id="container">{this.props.book.text ? this.displayBook() : null} </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { book: state.currentBook };
};
const mapDispatchToProps = dispatch => {
  return { fetchBook: id => dispatch(fetchBook(id)), setAnnotations: query => dispatch(setAnnotations(query)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookContainer);
