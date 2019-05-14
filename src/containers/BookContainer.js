import React, { Component } from "react";
import { setBook } from "../redux/actions/bookActions";
import { connect } from "react-redux";

class BookContainer extends Component {
  componentDidMount() {
    this.fetchBook();
  }
  fetchBook = async () => {
    const resp = await fetch("http://localhost:3000/api/v1/books/1");
    const book = await resp.json();
    const text = JSON.parse(book.temporary_text);

    this.props.setBook({ ...book, text: text.body });
  };
  render() {
    return (
      <div>
        <p>{this.props.book.title}</p>
        <p>{this.props.book.author}</p>
        {this.props.book.text ? <p dangerouslySetInnerHTML={{ __html: this.props.book.text }} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { book: state.book };
};
const mapDispatchToProps = dispatch => {
  return { setBook: book => dispatch(setBook(book)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookContainer);
