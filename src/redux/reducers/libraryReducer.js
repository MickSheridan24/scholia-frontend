function libraryReducer(state = [], action) {
  switch (action.type) {
    case "ADD_BOOK":
      if (state.length >= 5) {
        return [action.book, ...state.slice(0, 4)];
      } else {
        return [action.book, ...state];
      }

    default:
      return state;
  }
}
function libraryIndexReducer(state = [], action) {
  switch (action.type) {
    case "ADD_BOOK":
      if (state.length >= 5) {
        return [
          {
            title: action.book.title,
            gutenberg_id: action.book.gutenberg_id,
            id: action.book.id,
            author: action.book.author,
          },
          ...state.slice(0, 4),
        ];
      } else {
        return [
          {
            title: action.book.title,
            gutenberg_id: action.book.gutenberg_id,
            id: action.book.id,
            author: action.book.author,
          },
          ...state,
        ];
      }

    default:
      return state;
  }
}

export { libraryReducer, libraryIndexReducer };
