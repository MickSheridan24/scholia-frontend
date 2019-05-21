import { annotateAndSetBook } from "./currentBookActions";

function setAnnotations(query = {}) {
  // console.log("SET ANNOTATIONS");
  return async (dispatch, getState) => {
    const book = findBook(getState);
    await dispatch(fetchAnnotations(book, query));
    dispatch(annotateAndSetBook(book));
  };
}

function fetchAnnotations(book, query = {}) {
  // console.log("FETCH ANNOTATIONS");
  return async dispatch => {
    const resp = await fetch(`http://localhost:3000/api/v1/annotations?book_id=${book.id}&options=${query}`, {
      method: "GET",
      headers: { "Content-Type": "Application/json" },
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const annotations = await resp.json();
    const preparedAnnotations = annotations.map(a => {
      return { ...a, visible: false, highlighted: false };
    });
    dispatch({ type: "SET_OTHER_ANNOTATIONS", annotations: preparedAnnotations });
  };
}

function postAnnotation({ pIndex, charIndex, title, body }) {
  // console.log("POST ANNOTATIONS");
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    const book = getState().currentBook;
    const resp = await fetch("http://localhost:3000/api/v1/annotations", {
      method: "POST",
      headers: { "Content-Type": "Application/json", accepts: "Application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        annotation: {
          book_id: book.id,
          body: body,
          location_p_index: pIndex,
          location_char_index: charIndex,
          title: title,
        },
      }),
    });
    const postResp = await resp.json();
    if (postResp.success) {
      const annotation = postResp.annotation;
      dispatch(addAnnotation(annotation));
      const originalBook = findBook(getState);
      dispatch(annotateAndSetBook(originalBook));
    } else {
      debugger;
      alert("Something went wrong saving your annotation.");
    }
  };
}

function addAnnotation(annotation) {
  // console.log("ADD ANNOTATION");
  return { type: "ADD_ANNOTATION", annotation: annotation };
}

function newAnnotationForm(args) {
  // console.log("NEW FORM");
  return { type: "NEW_ANNOTATION_FORM", args: args };
}

function findBook(getState) {
  // console.log("LOOKING UP BOOK");
  const book = getState().currentBook;
  const originalBook = getState().library.find(b => b.id === book.id);
  return originalBook;
}

function highlightAnnotation(id) {
  // console.log("HIGHLIGHT ACTION");
  return { type: "HIGHLIGHT_ANNOTATION", annotationId: parseInt(id) };
}
function enterAnnotation(id) {
  // console.log("ENTER ANNOTATION ACTION");
  return { type: "ENTER_ANNOTATION", annotationId: parseInt(id) };
}
function exitAnnotation(id) {
  // console.log("EXIT ANNOTATION ACTION");
  return { type: "EXIT_ANNOTATION", annotationId: parseInt(id) };
}
export {
  newAnnotationForm,
  fetchAnnotations,
  setAnnotations,
  postAnnotation,
  highlightAnnotation,
  exitAnnotation,
  enterAnnotation,
};
