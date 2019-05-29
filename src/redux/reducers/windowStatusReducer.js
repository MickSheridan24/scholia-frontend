const INITIALSTATE = {
  loading: false,
  userShow: true,
  otherShow: true,
  currentChunk: 0,
  selectedLine: {},
  allToggle: false,
  annotationForm: null,
  studiesList: false,
};

function windowStatusReducer(state = INITIALSTATE, action) {
  switch (action.type) {
    case "NEW_ANNOTATION_FORM":
      return {
        ...state,
        annotationForm: action.args,
        selectedLine: { index: action.args.pIndex, character: action.args.charIndex },
        studiesList: false,
      };
    case "CANCEL_ANNOTATION_FORM":
      return {
        ...state,
        annotationForm: null,
        selectedLine: {},
      };
    case "TOGGLE_STUDIES_LIST":
      return {
        ...state,
        studiesList: action.bool,
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
      return { ...state, allToggle: !state.allToggle };
    case "SET_LOADING":
      return { ...state, loading: action.increment };
    case "SET_BOOK":
      return { ...state, loading: false, currentChunk: 0 };
    case "SELECT_ANNOTATION":
      return { ...state, currentChunk: Math.floor(parseInt(action.annotation.location_p_index) / 1000) };

    default:
      return state;
  }
}

export { windowStatusReducer };
