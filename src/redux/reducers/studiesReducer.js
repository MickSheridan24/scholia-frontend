function studiesReducer(state = [], action) {
  switch (action.type) {
    case "SET_STUDIES":
      return action.studies;
    default:
      return state;
  }
}

export { studiesReducer };
