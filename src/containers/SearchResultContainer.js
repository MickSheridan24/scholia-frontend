import React, { Component } from "react";
import SearchResult from "../components/SearchResult";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";

class SearchResultContainer extends Component {
  render() {
    return this.props.results.length > 0 ? (
      this.props.results[0] ? (
        <div className="search-results-container">
          {this.props.results.map(r => (
            <SearchResult result={r} />
          ))}
        </div>
      ) : (
        <div className="search-results-container">
          <div className="search-no-result">No Results</div>
        </div>
      )
    ) : null;
  }
}

function mapStateToProps(state) {
  return { results: state.searchResults };
}

export default connect(mapStateToProps)(SearchResultContainer);
