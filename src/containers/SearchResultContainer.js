import React, { Component } from "react";
import SearchResult from "../components/SearchResult";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";

class SearchResultContainer extends Component {
  render() {
    return this.props.results ? (
      <div>
        Results
        {this.props.results.map(r => (
          <SearchResult result={r} />
        )) }
            <NavBar></NavBar>
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  return { results: state.searchResults };
}

export default connect(mapStateToProps)(SearchResultContainer);