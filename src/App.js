import React from "react";
import { Route, Switch } from "react-router-dom";
import AnnotationsContainer from "./containers/AnnotationsContainer";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import "./App.css";
import BookInterface from "./containers/BookInterface";
import { autoLogin } from "./redux/actions/userActions";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.login();
    }
  }
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/book" component={this.props.user.username ? BookInterface : Login} />
          <Route exact path="/annotations" component={this.props.user.username ? AnnotationsContainer : Login} />
          <Route component={this.props.user.username ? UserHome : Login} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}
function mapDispatchToProps(dispatch) {
  return { login: () => dispatch(autoLogin()) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
