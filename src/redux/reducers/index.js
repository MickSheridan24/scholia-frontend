import { combineReducers } from "redux";
import currentBookReducer from "./currentBookReducer";
import { libraryReducer, libraryIndexReducer } from "./libraryReducer";
import { userAnnotationsReducer, otherAnnotationsReducer } from "./annotationsReducer";

const rootReducer = combineReducers({
  currentBook: currentBookReducer,
  library: libraryReducer,
  libraryIndex: libraryIndexReducer,
  userAnnotations: userAnnotationsReducer,
  otherAnnotations: otherAnnotationsReducer,
});
export default rootReducer;
