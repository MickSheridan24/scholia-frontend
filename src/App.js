import React from "react";
import { Route } from "react-router-dom";
import BookContainer from "./containers/BookContainer";
import AnnotationsContainter from "./containers/AnnotationsContainter";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import UserHome from "./components/UserHome";

function App() {
  let token = localStorage.getItem("token");
  return token ? (
    <div>
      <NavBar />
      <Route path="/home" component={UserHome} />
      <Route path="/bookContainer" component={BookContainer} />
      <Route path="/annotations" component={AnnotationsContainter} />
    </div>
  ) : (
    <Login />
  );
}

export default App;
