import React from "react";
import { connect } from "react-redux";
import { fetchBook, setLoading } from "../redux/actions/libraryActions";
import { NavLink as Link } from "react-router-dom";

// SearchResult for displaying individual search result items
// Parent: SearchResultsContainer

function SearchResult(props) {
  return (
    <div className="search-result">
      <div className="search-result-left-section">
        <div className="search-result-title">{props.result.title}</div>
        <div className="search-result-author">{props.result.author}</div>
      </div>
      <div className="search-result-right-section">
        <Link to={`/book/${props.result.id}`}>
          <i className="large checkout-button book icon" onClick={() => props.setLoading()} />
        </Link>
      </div>
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
