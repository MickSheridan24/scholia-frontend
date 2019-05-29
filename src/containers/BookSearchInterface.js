import React, { Component } from "react";
import SearchForm from "../components/SearchForm";
import SearchResultContainer from "./SearchResultContainer";
import LibraryContainer from "./LibraryContainer";
import NavBar from "../components/NavBar";

export default class BookSearchInterface extends Component {
  render() {
    return (
      <div className="book-search-interface">
        <div className="book-search-left">
          <SearchForm />
          <SearchResultContainer />
        </div>

        <div className="book-search-right">
          <LibraryContainer />
        </div>
      </div>
    );
  }
}
