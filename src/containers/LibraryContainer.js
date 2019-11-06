import React, { Component } from "react";
import { connect } from "react-redux";
import LibraryCard from "../components/LibraryCard";

// LibraryContainer for holding Library Cards
// Parents: UserHome, BookSearchInterface

class LibraryContainer extends Component {
  displayLibrary() {
    return this.props.library.map(book => {
      return <LibraryCard book={book} />;
    });
  }

  render() {
    return (
      <div className="library-container">
        {this.props.library.length > 0 ? this.displayLibrary() : "There are no books in your library yet!"}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { library: state.libraryIndex };
}
export default connect(mapStateToProps)(LibraryContainer);
