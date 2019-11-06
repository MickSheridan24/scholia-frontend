import React, { useState } from "react";
import { searchBooks } from "../redux/actions/libraryActions";
import { connect } from "react-redux";
import NavBar from "./NavBar";

// SearchForm for entering Searches to the backend
// Parent: BookSearchInterface

class SearchForm extends React.Component {
  state = {
    query: "",
  };
  render() {
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
          value={this.state.query}
          onChange={e => this.setState({ query: e.target.value })}
        />
        <button
          id="search-button"
          onClick={e => {
            e.preventDefault();
            this.props.searchBooks(this.state.query);
          }}>
          Search
        </button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { searchBooks: q => dispatch(searchBooks(q)) };
}

export default connect(
  null,
  mapDispatchToProps,
)(SearchForm);
