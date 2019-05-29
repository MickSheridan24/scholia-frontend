import React, { useState } from "react";
import { searchBooks } from "../redux/actions/libraryActions";
import { connect } from "react-redux";
import NavBar from "./NavBar";

function SearchForm(props) {
  const [query, setQuery] = useState("");
  return (
    <div className="search-form">
      <label className="search-form-label">Search For a Book or Author</label>
      <div className="search-form-nav-container">
        <NavBar />
      </div>
      <input
        autocomplete="off"
        className="search-input"
        type="text"
        name="query"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button
        id="search-button"
        onClick={e => {
          e.preventDefault();
          props.searchBooks(query);
        }}>
        Search
      </button>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return { searchBooks: q => dispatch(searchBooks(q)) };
}

export default connect(
  null,
  mapDispatchToProps,
)(SearchForm);
