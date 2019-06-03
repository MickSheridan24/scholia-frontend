import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

// LibraryCard for navigating to specific books that have already been checked out
// Parent: LibraryContainer

class LibraryCard extends Component {
  render() {
    return (
      <div className="library-card">
        <Link className="card-link" to={`/book/${this.props.book.gutenberg_id}`}>
          <div className="library-card-title">{this.props.book.title}</div>
          <div className="library-card-author">{this.props.book.author}</div>
        </Link>
      </div>
    );
  }
}
export default LibraryCard;
