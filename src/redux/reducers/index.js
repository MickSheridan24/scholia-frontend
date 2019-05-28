import { combineReducers } from "redux";
import currentBookReducer from "./currentBookReducer";
import { libraryReducer, libraryIndexReducer } from "./libraryReducer";
import { windowStatusReducer } from "./windowStatusReducer";
import { userAnnotationsReducer, otherAnnotationsReducer } from "./annotationsReducer";
import { userReducer } from "./userReducer";
import { searchResultsReducer } from "./searchResultsReducer";
import { studiesReducer } from "./studiesReducer";

const rootReducer = combineReducers({
  currentBook: currentBookReducer,
  windowStatus: windowStatusReducer,
  library: libraryReducer,
  libraryIndex: libraryIndexReducer,
  userAnnotations: userAnnotationsReducer,
  otherAnnotations: otherAnnotationsReducer,
  user: userReducer,
  searchResults: searchResultsReducer,
  studies: studiesReducer,
});
export default rootReducer;
