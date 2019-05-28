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
      headers: { "Content-Type": "Application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const annotations = await resp.json();
    const preparedAnnotations = annotations.map(a => {
      return { ...a, visible: false, highlighted: false, selected: false };
    });
    dispatch({ type: "SET_OTHER_ANNOTATIONS", annotations: preparedAnnotations });
  };
}

function postAnnotation({ pIndex, charIndex, title, body, color, study_id }) {
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
          color: color,
          location_p_index: pIndex,
          location_char_index: charIndex,
          title: title,
          study_id: study_id > 0 ? study_id : null,
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
function cancelAnnotationForm() {
  return { type: "CANCEL_ANNOTATION_FORM" };
}

function findBook(getState) {
  // console.log("LOOKING UP BOOK");
  const book = getState().currentBook;
  const originalBook = getState().library.find(b => b.id === book.id);
  return originalBook;
}

function highlightAnnotation(id) {
  return { type: "HIGHLIGHT_ANNOTATION", annotationId: parseInt(id) };
}

function selectAnnotation(annotation) {
  return { type: "SELECT_ANNOTATION", annotation: annotation };
}
function deselectAnnotation() {
  return { type: "DESELECT_ANNOTATION" };
}

function deleteAnnotation(id) {
  return async (dispatch, getState) => {
    const resp = await fetch(`http://localhost:3000/api/v1/annotations/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const status = await resp.json();
    if (status.success) {
      await dispatch({ type: "DELETE_ANNOTATION", annotationId: parseInt(id) });
      const originalBook = findBook(getState);
      dispatch(annotateAndSetBook(originalBook));
    } else {
      alert("Something went wrong with your request! Try again later.");
    }
  };
}
function likeAnnotation(id) {
  console.log("liking", id);
  return async (dispatch, getState) => {
    const resp = await fetch("http://localhost:3000/api/v1/annotations/likes", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ annotation: { id: id } }),
    });
    const status = await resp.json();
    if (status.success) {
      dispatch({ type: "LIKE_ANNOTATION", annotationId: id });
    }
  };
}
function enterAnnotation(id) {
  // console.log("ENTER ANNOTATION ACTION");
  return { type: "ENTER_ANNOTATION", annotationId: parseInt(id) };
}
function exitAnnotation(id) {
  // console.log("EXIT ANNOTATION ACTION");
  return { type: "EXIT_ANNOTATION", annotationId: parseInt(id) };
}
function setShowUserAnnotations(bool) {
  return dispatch => dispatch({ type: "SET_SHOW_USER_ANNOTATIONS", value: bool });
}
function setShowOtherAnnotations(bool, dispatch) {
  return { type: "SET_SHOW_OTHER_ANNOTATIONS", value: bool };
}
function toggleAll() {
  return { type: "TOGGLE_ALL" };
}
function setStudiesList(b) {
  return { type: "TOGGLE_STUDIES_LIST", bool: b };
}

export {
  newAnnotationForm,
  fetchAnnotations,
  setAnnotations,
  postAnnotation,
  highlightAnnotation,
  exitAnnotation,
  enterAnnotation,
  setShowUserAnnotations,
  setShowOtherAnnotations,
  deleteAnnotation,
  likeAnnotation,
  selectAnnotation,
  toggleAll,
  cancelAnnotationForm,
  setStudiesList,
  deselectAnnotation,
};
