import { setBook } from "./currentBookActions";

// Fetches book from database/ gutenberg
function fetchBook(id) {
  return async (dispatch, getState) => {
    dispatch(setLoading());
    const inLibrary = lookUpBook(getState, id);

    if (inLibrary) {
      dispatch(setBook(inLibrary));
    } else {
      const resp = await fetch(`http://localhost:3000/api/v1/books/${id}`);
      const book = await resp.json();
      let unparsed = JSON.parse(book.temporary_text).body;
      book.text = cleanBook(unparsed);
      dispatch(addBook(book));
      dispatch(setBook(book));
    }
  };
}

//provides all necessary sanitations
function cleanBook(text) {
  return text.replace(/_/g, "");
}

// adds book to library
function addBook(book) {
  return { type: "ADD_BOOK", book: book };
}

// searches gutendex
function searchBooks(query) {
  return async dispatch => {
    const resp = await fetch(`http://localhost:3000/api/v1/books/search?query=${query}`);
    const searchResults = await resp.json();

    if (searchResults.success) {
      dispatch({ type: "SET_RESULTS", results: searchResults.results });
    } else {
      dispatch({ type: "SET_RESULTS", results: [false] });
    }
  };
}

// checks if library already has book
function lookUpBook(getState, id) {
  return getState().library.find(b => b.gutenberg_id === parseInt(id));
}

// changes Loading status
function setLoading() {
  return { type: "SET_LOADING" };
}

export { fetchBook, addBook, searchBooks, setLoading };
