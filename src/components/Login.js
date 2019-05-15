import React, { Component } from "react";

export default class Login extends Component {
  handleLogin = async e => {
    e.preventDefault();
    const user = {
      authentication: {
        username: e.currentTarget.elements.username.value,
        password: e.currentTarget.elements.password.value,
      },
    };
    const resp = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(user),
    });
    const loginStatus = await resp.json();

    this.handleResponse(loginStatus);
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

    this.handleResponse(signUpStatus);
  };
  handleResponse = obj => {
    if (obj["success"]) {
      localStorage.setItem("token", obj["jwt"]);
    }
  };
  render() {
    return (
      <div>
        <p>Login</p>
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
