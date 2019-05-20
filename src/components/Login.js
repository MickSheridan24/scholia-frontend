import React, { Component } from "react";
import { login } from "../redux/actions/userActions";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    fail: false,
  };
  handleLogin = async e => {
    e.preventDefault();
    const user = {
      authentication: {
        username: e.currentTarget.elements.username.value,
        password: e.currentTarget.elements.password.value,
      },
    };
    this.props.login(user);
  };
  handleSignUp = async e => {
    e.preventDefault();
    const user = {
      user: { username: e.currentTarget.elements.username.value, password: e.currentTarget.elements.password.value },
    };
    const resp = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(user),
    });
    const signUpStatus = await resp.json();

    this.props.login(signUpStatus);
  };

  handleResponse = obj => {
    if (obj["success"]) {
    } else {
      this.setState({ fail: true });
    }
  };

  render() {
    return (
      <div>
        <p>Login</p>
        {this.state.fail ? <p style={{ color: "red" }}>Username/Password incorrect</p> : null}
        <form onSubmit={this.handleLogin}>
          <input name="username" type="text" />
          <input name="password" type="password" />
          <input type="submit" />
        </form>
        <br />
        <p>Signup</p>
        <form onSubmit={this.handleSignUp}>
          <input name="username" type="text" />
          <input name="password" type="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return { login: user => dispatch(login(user)) };
}

export default connect(
  null,
  mapDispatchToProps,
)(Login);
