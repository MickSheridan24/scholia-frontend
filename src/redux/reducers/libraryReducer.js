function libraryReducer(state = [], action) {
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.book];

    default:
      return state;
  }
}
function libraryIndexReducer(state = [], action) {
  switch (action.type) {
    case "ADD_BOOK":
      return [
        ...state,
        {
          title: action.book.title,
          gutenberg_id: action.book.gutenberg_id,
          id: action.book.id,
          author: action.book.author,
        },
      ];

    default:
      return state;
  }
}

export { libraryReducer, libraryIndexReducer };
