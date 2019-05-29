import React, { Component } from "react";
import SearchForm from "../components/SearchForm";
import SearchResultContainer from "./SearchResultContainer";
import LibraryContainer from "./LibraryContainer";

export default class BookSearchInterface extends Component {
  render() {
    return (
      <div>
        <SearchForm />
        <LibraryContainer />
        <SearchResultContainer />
      </div>
    );
  }
}
