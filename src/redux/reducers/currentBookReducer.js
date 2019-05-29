function currentBookReducer(state = {}, action) {
  switch (action.type) {
    case "SET_BOOK":
      return action.book;
    case "ADD_CHUNK":
      const text = [...state.text, action.chunk];

      return { ...state, text: text };
    case "REANNOTATE_CHUNK":
      const newChunks = [...state.text];
      newChunks[action.chunkIndex] = action.chunk;
      return { ...state, text: newChunks };
    case "SET_LOADING":
      return {};
    default:
      return state;
  }
}

export default currentBookReducer;
