function bookWindowReducer(state = {}, action) {
  switch (action.type) {
    case "SET_SCROLLING":
      return { ...state, scrolling: action.scrolling };
    default:
      return state;
  }
}

export { bookWindowReducer };
