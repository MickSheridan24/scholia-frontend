import { annotate } from "./currentBookActions";

function setAnnotations(query = {}) {
  return async (dispatch, getState) => {
    const book = getState().currentBook;
    await dispatch(fetchAnnotations(book, query));
    const annotations = getState().annotations;
    const annotatedBook = annotate(book, annotations);
    dispatch({ type: "SET_BOOK", book: annotatedBook });
  };
}

function fetchAnnotations(book, query = {}) {
  return async dispatch => {
    const resp = await fetch(`http://localhost:3000/api/v1/annotations?book_id=${book.id}&options=${query}`, {
      method: "GET",
      headers: { "Content-Type": "Application/json" },
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const annotations = await resp.json();
    dispatch({ type: "SET_OTHER_ANNOTATIONS", annotations: annotations });
  };
}

export { fetchAnnotations, setAnnotations };
