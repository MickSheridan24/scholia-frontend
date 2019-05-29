import { setBook } from "./currentBookActions";

function fetchBook(id) {
  // console.log("FETCHBOOK ACTION");
  return async dispatch => {
    dispatch(setLoading());
    const resp = await fetch(`http://localhost:3000/api/v1/books/${id}`);
    const book = await resp.json();

    let unparsed = JSON.parse(book.temporary_text).body;
    book.text = unparsed;

    dispatch(addBook(book));

    dispatch(setBook(book));
  };
}

//addBook adds the retrievedBook to the library
function addBook(book) {
  // console.log("ADDBOOK ACTION");
  return { type: "ADD_BOOK", book: book };
}
function searchBooks(query) {
  return async dispatch => {
    const resp = await fetch(`http://localhost:3000/api/v1/books/search?query=${query}`);
    const searchResults = await resp.json();

    if (searchResults.success) {
      dispatch({ type: "SET_RESULTS", results: searchResults.results });
    }
  };
}
function setLoading() {
  return { type: "SET_LOADING" };
}

export { fetchBook, addBook, searchBooks, setLoading };
