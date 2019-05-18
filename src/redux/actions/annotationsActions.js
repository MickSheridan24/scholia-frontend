import { annotate } from "./currentBookActions";

function setAnnotations(query = {}) {
  return async (dispatch, getState) => {
    const book = getState().currentBook;
    await dispatch(fetchAnnotations(book, query));
    const annotations = getState().otherAnnotations;
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

function postAnnotation({ pIndex, charIndex, text }) {
  return async (dispatch, getState) => {
    const book = getState().currentBook;
    const resp = await fetch("http://localhost:3000/api/v1/annotations", {
      method: "POST",
      headers: { "Content-Type": "Application/json", accepts: "Application/json" },
      body: JSON.stringify({
        annotation: {
          book_id: book.id,
          body: text,
          location_p_index: pIndex,
          location_char_index: charIndex,
          title: "THIS IS A TEST",
        },
      }),
    });
    const annotation = await resp.json();

    dispatch(addAnnotation(annotation));
    const annotations = getState().otherAnnotations;
    const originalBook = getState().library.find(b => b.id === book.id);
    const annotatedBook = annotate(originalBook, annotations);
    dispatch({ type: "SET_BOOK", book: { ...book, temporary_text: "", text: annotatedBook } });
  };
}

function addAnnotation(annotation) {
  return { type: "ADD_ANNOTATION", annotation: annotation };
}

export { fetchAnnotations, setAnnotations, postAnnotation };
