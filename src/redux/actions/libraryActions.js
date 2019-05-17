import { setBook } from "./currentBookActions";

function fetchBook(id) {
  return async dispatch => {
    const resp = await fetch(`http://localhost:3000/api/v1/books/${id}`);
    const book = await resp.json();
    //book.text = JSON.parse(book.temporary_text);
    dispatch(addBook(book));
    dispatch(setBook(book));
  };
}

//addBook adds the retrievedBook to the library
function addBook(book) {
  return { type: "ADD_BOOK", book: book };
}

export { fetchBook, addBook };
