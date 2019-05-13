import React from "react";
import { Route } from "react-router-dom";
import BookContainer from "./containers/BookContainer";
import AnnotationsContainter from "./containers/AnnotationsContainter";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Route path="/bookContainer" component={BookContainer} />
      <Route path="/annotations" component={AnnotationsContainter} />
    </div>
  );
}

export default App;
