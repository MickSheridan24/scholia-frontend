import React from "react";
import { Route } from "react-router-dom";
import AnnotationsContainer from "./containers/AnnotationsContainer";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import "./App.css";
import BookInterface from "./containers/BookInterface";

function App() {
  let token = localStorage.getItem("token");
  return token ? (
    <div>
      <NavBar />
      <Route path="/home" component={UserHome} />
      <Route path="/bookContainer" component={BookInterface} />
      <Route path="/annotations" component={AnnotationsContainer} />
    </div>
  ) : (
    <Login />
  );
}

export default App;
