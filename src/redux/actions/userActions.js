// fresh login without token
function login(user) {
  return async dispatch => {
    const resp = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(user),
    });
    const loginStatus = await resp.json();

    if (loginStatus.success) {
      localStorage.setItem("token", loginStatus["jwt"]);
      console.log("Welcome back, prisoner #", loginStatus.id);
      dispatch({
        type: "SET_USER",
        user: { username: loginStatus.username, id: loginStatus.id, login: loginStatus.success },
      });
    }
  };
}

// autoLogin for people with tokens or those who have just signed up
function autoLogin() {
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
      console.log("Welcome back, prisoner #", user.id);
      dispatch({ type: "SET_USER", user: { username: user.username, id: user.id, login: true } });
    }
  };
}

//clears user from store
function logout() {
  return { type: "SET_USER", user: {} };
}

export { login, logout, autoLogin };
