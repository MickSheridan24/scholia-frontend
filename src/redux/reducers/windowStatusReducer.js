function windowStatusReducer(state = {}, action) {
  switch (action.type) {
    case "NEW_ANNOTATION_FORM":
      return { ...state, annotationForm: action.args };
    case "ADD_ANNOTATION":
      return { ...state, annotationForm: null };
    default:
      return state;
  }
}

export { windowStatusReducer };
