//Current Book represents the active piece of text
//It is the result of a fetch from library/backed and annotate()

function currentBookReducer(state = {}, action) {
  switch (action.type) {
    case "SET_BOOK":
      return action.book;
    case "ADD_CHUNK":
      const text = [...state.text];
      text.push(action.chunk);
      return { ...state, text: text };
    default:
      return state;
  }
}

export default currentBookReducer;
