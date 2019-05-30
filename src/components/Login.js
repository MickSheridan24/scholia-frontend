import React, { Component } from "react";
import { login, autoLogin } from "../redux/actions/userActions";
import { connect } from "react-redux";
import { sign } from "crypto";

class Login extends Component {
  state = {
    highlight: false,
    fail: false,
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      (nextState.fail !== this.state.fail && !localStorage.getItem("token")) ||
      nextState.highlight !== this.state.highlight
    );
  }
  handleLogin = async e => {
    e.preventDefault();
    const user = {
      authentication: {
        username: e.currentTarget.elements.username.value,
        password: e.currentTarget.elements.password.value,
      },
    };

    await this.props.login(user);

    this.setState({ fail: true });
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

    if (signUpStatus.success) {
      localStorage.setItem("token", signUpStatus["jwt"]);
      await this.props.autoLogin();
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="header">
          Scholia
          <span
            onMouseEnter={() => {
              this.setState({ highlight: true });
            }}
            onMouseLeave={() => {
              this.setState({ highlight: false });
            }}
            className={this.state.highlight ? "highlighted-login-asterisk" : ""}
            id="login-asterisk">
            *
          </span>
          {this.state.highlight ? (
            <div className="login-asterisk-hidden-definition">
              <p>
                <em>Scholium</em>, pl. <em>Scholia</em> a note on or explanation of an academic or literary text,
                written by someone who has studied it (Cambridge Dictionary)
              </p>
            </div>
          ) : null}
        </div>
        <div className="login-widgets">
          <div className="login-segment">
            <form className="login-form" onSubmit={this.handleLogin}>
              {this.state.fail ? <p className="login-error">Username/Password incorrect</p> : null}
              <div className="login-label">Login</div>
              <label className="login-input-label">Username: </label>
              <input autoComplete="off" className="login-input" name="username" type="text" />
              <label className="login-input-label">Password: </label>
              <input autoComplete="off" className="login-input" name="password" type="password" />
              <input className="login-submit" type="submit" />
            </form>
          </div>

          <div className="login-segment">
            <form className="login-form" onSubmit={this.handleSignUp}>
              <div className="login-label">Sign Up</div>
              <label className="login-input-label">Username: </label>
              <input autoComplete="off" className="login-input" name="username" type="text" />
              <label className="login-input-label">Password: </label>
              <input autoComplete="off" className="login-input" name="password" type="password" />
              <input className="login-submit" type="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return { login: user => dispatch(login(user)), autoLogin: () => dispatch(autoLogin()) };
}

export default connect(
  null,
  mapDispatchToProps,
)(Login);
