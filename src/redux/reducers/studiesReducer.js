function studiesReducer(state = [], action) {
  switch (action.type) {
    case "SET_STUDIES":
      return action.studies;
    case "TOGGLE_STUDY":
      return state.map(s => (s.id === action.studyId ? { ...s, visible: action.bool } : s));
    default:
      return state;
  }
}

export { studiesReducer };
