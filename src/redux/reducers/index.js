import { combineReducers } from "redux";
import currentBookReducer from "./currentBookReducer";
import { libraryReducer, libraryIndexReducer } from "./libraryReducer";
import { bookWindowReducer } from "./bookWindowReducer";
import { userAnnotationsReducer, otherAnnotationsReducer } from "./annotationsReducer";

const rootReducer = combineReducers({
  currentBook: currentBookReducer,
  bookWindow: bookWindowReducer,
  library: libraryReducer,
  libraryIndex: libraryIndexReducer,
  userAnnotations: userAnnotationsReducer,
  otherAnnotations: otherAnnotationsReducer,
});
export default rootReducer;
