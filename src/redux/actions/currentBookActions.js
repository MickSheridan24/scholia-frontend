import { fetchAnnotations } from "./annotationsActions";

function setBook(book) {
  return async (dispatch, getState) => {
    await dispatch(fetchAnnotations(book));
    const annotations = getState().otherAnnotations;
    const annotatedBook = annotate(book, annotations);
    dispatch({ type: "SET_BOOK", book: annotatedBook });
  };
}

function annotate(book, annotations) {
  return book;
}

export { setBook, annotate };
