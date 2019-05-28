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
      return [...state, { title: action.book.title, id: action.book.id }];

    default:
      return state;
  }
}

export { libraryReducer, libraryIndexReducer };
