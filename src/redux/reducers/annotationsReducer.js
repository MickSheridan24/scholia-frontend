//represents current annotations being worked with
//changes if annotation query changes
//or book is switched

function userAnnotationsReducer(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

function otherAnnotationsReducer(state = [], action) {
  switch (action.type) {
    case "SET_OTHER_ANNOTATIONS":
      return action.annotations;
    case "ADD_ANNOTATION":
      return [...state, action.annotation];
    default:
      return state;
  }
}

export { userAnnotationsReducer, otherAnnotationsReducer };
