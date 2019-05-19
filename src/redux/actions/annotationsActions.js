import { annotateAndSetBook } from "./currentBookActions";

function setAnnotations(query = {}) {
  return async (dispatch, getState) => {
    const book = findBook(getState);
    await dispatch(fetchAnnotations(book, query));
    dispatch(annotateAndSetBook(book));
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
    const preparedAnnotations = annotations.map(a => {
      return { ...a, visible: true, highlighted: false };
    });
    dispatch({ type: "SET_OTHER_ANNOTATIONS", annotations: preparedAnnotations });
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
    const originalBook = findBook(getState);
    dispatch(annotateAndSetBook(originalBook));
  };
}

function addAnnotation(annotation) {
  return { type: "ADD_ANNOTATION", annotation: annotation };
}

function findBook(getState) {
  const book = getState().currentBook;
  const originalBook = getState().library.find(b => b.id === book.id);
  return originalBook;
}

function highlightAnnotation(id) {
  return { type: "HIGHLIGHT_ANNOTATION", annotationId: id };
}
export { fetchAnnotations, setAnnotations, postAnnotation, highlightAnnotation };
