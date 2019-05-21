const INITIALSTATE = { userShow: true, otherShow: true };

function windowStatusReducer(state = INITIALSTATE, action) {
  switch (action.type) {
    case "NEW_ANNOTATION_FORM":
      return { ...state, annotationForm: action.args };
    case "ADD_ANNOTATION":
      return { ...state, annotationForm: null };
    case "SET_SHOW_USER_ANNOTATIONS":
      return { ...state, userShow: action.value };
    case "SET_SHOW_OTHER_ANNOTATIONS":
      return { ...state, otherShow: action.value };
    default:
      return state;
  }
}

export { windowStatusReducer };
