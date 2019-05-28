import React from "react";
import { connect } from "react-redux";
import { fetchBook, setLoading } from "../redux/actions/libraryActions";
import { NavLink as Link } from "react-router-dom";

function SearchResult(props) {
  return (
    <div className="ui container">
      <div className="label-title">{props.result.title}</div>
      <em>{props.result.author}</em>
      <button onClick={() => props.setLoading()}>
        <Link to={`/book/${props.result.id}`}>Checkout</Link>
      </button>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return { fetchBook: id => dispatch(fetchBook(id)), setLoading: () => dispatch(setLoading()) };
}

export default connect(
  null,
  mapDispatchToProps,
)(SearchResult);
