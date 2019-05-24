import React, { Component } from "react";
import SearchForm from "../components/SearchForm";
import SearchResultContainer from "./SearchResultContainer";

export default class BookSearchInterface extends Component {
  render() {
    return (
      <div>
        <SearchForm />
        <SearchResultContainer />
      </div>
    );
  }
}
