import React, { Component } from "react";

export default class UserHome extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
    };
  }
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = async () => {
    const req = await fetch("http://localhost:3000/api/v1/users/home", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const user = await req.json();
    this.setState({ user: user }, () => console.log(this.state));
  };

  render() {
    return <div>Hello, {this.state.user.username}</div>;
  }
}
