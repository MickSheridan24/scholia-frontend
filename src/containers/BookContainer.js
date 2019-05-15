import React, { Component } from "react";
import { fetchBook } from "../redux/actions/libraryActions";
import { setAnnotations } from "../redux/actions/annotationsActions";
import { connect } from "react-redux";

class BookContainer extends Component {
  componentDidMount() {
    this.props.fetchBook(2);
  }

  render() {
    return (
      <div onClick={this.props.setAnnotations}>
        <p>{this.props.book.title}</p>
        <p>{this.props.book.author}</p>
        {this.props.book.text ? <p dangerouslySetInnerHTML={{ __html: this.props.book.text.body }} /> : null}
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
