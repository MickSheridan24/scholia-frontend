
import ENDPOINT from "../endpoint";

// Async request to fetch annotations
function fetchAnnotations(book) {
  return async dispatch => {
    const resp = await fetch(`${ENDPOINT}/annotations?book_id=${book.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    const annotations = await resp.json();
    const preparedAnnotations = annotations.map(a => {
      return { ...a, visible: false, highlighted: false, selected: false };
    });
    dispatch({
      type: "SET_OTHER_ANNOTATIONS",
      annotations: preparedAnnotations
    });
  };
}

// Async request to fetch a user's annotatins
function fetchUserAnnotations() {
  return async dispatch => {
    const resp = await fetch(`${ENDPOINT}/annotations`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    const annotations = await resp.json();
    dispatch({ type: "SET_USER_ANNOTATIONS", annotations: annotations });
  };
}

// Creates a new annotation
function postAnnotation({ pIndex, charIndex, title, body, color, study_id }) {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    const book = getState().currentBook;
    const resp = await fetch(`${ENDPOINT}/annotations`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        accepts: "Application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        annotation: {
          book_id: book.id,
          body: body,
          color: color,
          location_p_index: pIndex,
          location_char_index: charIndex,
          title: title,
          study_id: study_id > 0 ? study_id : null
        }
      })
    });
    const postResp = await resp.json();
    if (postResp.success) {
      const annotation = postResp.annotation;
      dispatch(addAnnotation(annotation));
    } else {
      alert("Something went wrong saving your annotation.");
    }
  };
}

// adds an annotation to the store
function addAnnotation(annotation) {
  return { type: "ADD_ANNOTATION", annotation: annotation };
}

// sets the windowStatus.annotationForm -- Shows and hides the form on double click
function newAnnotationForm(args) {
  // console.log("NEW FORM");
  return { type: "NEW_ANNOTATION_FORM", args: args };
}

//sets annotationForm to false without posting
function cancelAnnotationForm() {
  return { type: "CANCEL_ANNOTATION_FORM" };
}

// looks up the currentBook in the store's library -- for reannotating
function findBook(getState) {
  const book = getState().currentBook;
  const originalBook = getState().library.find(b => b.id === book.id);
  return originalBook;
}

// sets the status of both AnnotationLabel and AnnotationMarker to "highlighted"
function highlightAnnotation(id) {
  return { type: "HIGHLIGHT_ANNOTATION", annotationId: parseInt(id) };
}

// sets an annotation to selected -- window will scroll
function selectAnnotation(annotation) {
  return { type: "SELECT_ANNOTATION", annotation: annotation };
}

// removes selection
function deselectAnnotation() {
  return { type: "DESELECT_ANNOTATION" };
}

// deletes a user's annotations
function deleteAnnotation(id) {
  return async (dispatch, getState) => {
    const resp = await fetch(`${ENDPOINT}/annotations/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    const status = await resp.json();
    if (status.success) {
      const annotation = getState().otherAnnotations.find(a => a.id === id);
      await dispatch({ type: "DELETE_ANNOTATION", annotationId: parseInt(id) });
      const originalBook = findBook(getState);

    } else {
      alert("Something went wrong with your request! Try again later.");
    }
  };
}

// adds a like to the annotation
function likeAnnotation(id) {
  console.log("liking", id);
  return async (dispatch, getState) => {
    const resp = await fetch(`${ENDPOINT}/annotations/likes`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ annotation: { id: id } })
    });
    const status = await resp.json();
    if (status.success) {
      dispatch({ type: "LIKE_ANNOTATION", annotationId: id });
    }
  };
}

// sets highlight to true
function enterAnnotation(id) {
  return { type: "ENTER_ANNOTATION", annotationId: parseInt(id) };
}

// sets highlight to false
function exitAnnotation(id) {
  return { type: "EXIT_ANNOTATION", annotationId: parseInt(id) };
}

// sets the windowStatus to show a user's annotations
function setShowUserAnnotations(bool) {
  return dispatch =>
    dispatch({ type: "SET_SHOW_USER_ANNOTATIONS", value: bool });
}

// sets the windowStatus to show other annotations
function setShowOtherAnnotations(bool, dispatch) {
  return { type: "SET_SHOW_OTHER_ANNOTATIONS", value: bool };
}

// whether the container will show just annotations in view, or all annotations in document
function toggleAll() {
  return { type: "TOGGLE_ALL" };
}

// sets whether the user sees study subscriptions instead of annotations.
function setStudiesList(b) {
  return { type: "TOGGLE_STUDIES_LIST", bool: b };
}

export {
  newAnnotationForm,
  fetchAnnotations,
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
  findBook,
  fetchUserAnnotations
};
