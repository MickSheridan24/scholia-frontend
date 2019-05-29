import React, { useState } from "react";
import { searchBooks } from "../redux/actions/libraryActions";
import { connect } from "react-redux";

function SearchForm(props) {
  const [query, setQuery] = useState("");
  return (
    <div className="search-form">
      <form
        onSubmit={e => {
          e.preventDefault();
          props.searchBooks(query);
        }}>
        <input type="text" name="query" value={query} onChange={e => setQuery(e.target.value)} />
        <input type="submit" />
      </form>
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
