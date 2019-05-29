import React, { Component } from "react";
import { connect } from "react-redux";
import LibraryCard from "../components/LibraryCard";

class LibraryContainer extends Component {
  displayLibrary() {
    return this.props.library.map(book => {
      return <LibraryCard book={book} />;
    });
  }

  render() {
    return (
      <div className="library-container">
        {this.props.library.length > 0 ? <div>Currently in your Library:</div> : null}

        <div className="card-container"> {this.displayLibrary()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { library: state.libraryIndex };
}
export default connect(mapStateToProps)(LibraryContainer);
