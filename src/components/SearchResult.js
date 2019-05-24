import React from "react";
import { connect } from "react-redux";
import { fetchBook } from "../redux/actions/libraryActions";
import { NavLink as Link } from "react-router-dom";

function SearchResult(props) {
  return (
    <div className="ui container">
      <div className="label-title">{props.result.title}</div>
      <em>{props.result.author}</em>
      <button>
        <Link to={`/book/${props.result.id}`}>Checkout</Link>
      </button>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return { fetchBook: id => dispatch(fetchBook(id)) };
}

export default connect(
  null,
  mapDispatchToProps,
)(SearchResult);
