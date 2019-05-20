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
  let id = action.annotationId ? parseInt(action.annotationId) : 0;
  switch (action.type) {
    case "HIGHLIGHT_ANNOTATION":
      return state.map(a => {
        return a.id === id ? { ...a, highlighted: true } : { ...a, highlighted: false };
      });
    case "ENTER_ANNOTATION":
      return state.map(a => {
        return a.id === id ? { ...a, visible: true } : { ...a };
      });
    case "EXIT_ANNOTATION":
      return state.map(a => {
        return a.id === id ? { ...a, visible: false } : { ...a };
      });
    case "SET_OTHER_ANNOTATIONS":
      return action.annotations;
    case "ADD_ANNOTATION":
      let targetSpot = action.annotation.location_char_index;
      let targetAnno = state.find(anno => anno.location_char_index <= targetSpot);
      let targetIndex = state.indexOf(targetAnno);
      return [...state.slice(0, targetIndex), action.annotation, ...state.slice(targetIndex)];
    default:
      return state;
  }
}

export { userAnnotationsReducer, otherAnnotationsReducer };
