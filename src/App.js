import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import BookInterface from "./containers/BookInterface";
import BookSearchInterface from "./containers/BookSearchInterface";
import UserHome from "./components/UserHome";
import { autoLogin } from "./redux/actions/userActions";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.login();
    }
  }
  render() {
    console.log("App Render");
    return (
      <div className="main-window">
        <Switch>
          <Route exact path="/book/:id" component={this.props.user.username ? BookInterface : Login} />
           <Route exact path="/search" component={this.props.user.username ? BookSearchInterface : Login} />
           <Route component={this.props.user.username ? UserHome : Login} />
          <Route exact path="/book/:id" component={BookInterface} />
          <Route exact path="/search" component={BookSearchInterface} />
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
  mapDispatchToProps
)(App);
