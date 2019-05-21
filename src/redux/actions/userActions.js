function login(user) {
  // console.log("LOGIN");
  return async dispatch => {
    const resp = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(user),
    });
    const loginStatus = await resp.json();

    if (loginStatus.success) {
      localStorage.setItem("token", loginStatus["jwt"]);
      dispatch({ type: "SET_USER", user: { username: loginStatus.username, login: loginStatus.success } });
    }
  };
}

function autoLogin() {
  // console.log("AUTOLOGIN");
  return async dispatch => {
    let token = localStorage.getItem("token");
    const resp = await fetch("http://localhost:3000/api/v1/users/home", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await resp.json();
    if (user.id) {
      dispatch({ type: "SET_USER", user: { username: user.username, login: true } });
    }
  };
}
function logout() {
  // console.log("LOGOUT");
  return { type: "SET_USER", user: {} };
}

export { login, logout, autoLogin };
