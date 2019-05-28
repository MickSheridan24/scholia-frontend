const INITIALSTATE = {
  loading: 0,
  userShow: true,
  otherShow: true,
  currentChunk: 0,
  selectedLine: {},
  allToggle: false,
};

function windowStatusReducer(state = INITIALSTATE, action) {
  switch (action.type) {
    case "NEW_ANNOTATION_FORM":
      return {
        ...state,
        annotationForm: action.args,
        selectedLine: { index: action.args.pIndex, character: action.args.charIndex },
      };
    case "ADD_ANNOTATION":
      return { ...state, annotationForm: null, selectedLine: {} };
    case "SET_SHOW_USER_ANNOTATIONS":
      return { ...state, userShow: action.value };
    case "SET_SHOW_OTHER_ANNOTATIONS":
      return { ...state, otherShow: action.value };
    case "SET_CHUNK":
      return { ...state, currentChunk: action.value };
    case "TOGGLE_ALL":
      console.log("togglin", state.allToggle);
      return { ...state, allToggle: !state.allToggle };
    case "LOADING_BOOK":
      return { ...state, loading: action.increment };
    case "SET_BOOK":
      return { ...state, loading: 0, currentChunk: 0 };

    default:
      return state;
  }
}

export { windowStatusReducer };
