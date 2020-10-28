import ENDPOINT from "../endpoint";
// fresh login without token
function login(user) {
  return async (dispatch) => {
    const resp = await fetch(`${ENDPOINT}/login`, {
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
        user: {
          username: loginStatus.username,
          id: loginStatus.id,
          login: loginStatus.success,
        },
      });
    }
  };
}

// autoLogin for people with tokens or those who have just signed up
function autoLogin() {
  return async (dispatch) => {
    let token = localStorage.getItem("token");
    const resp = await fetch(`${ENDPOINT}/users/home`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await resp.json();
    if (user.id) {
      console.log("Welcome back, prisoner #", user.id);
      dispatch({
        type: "SET_USER",
        user: { username: user.username, id: user.id, login: true },
      });
    }
  };
}

//clears user from store
function logout() {
  return { type: "SET_USER", user: {} };
}

function createUser(user) {
  return async (dispatch) => {
    const resp = await fetch(`${ENDPOINT}/users`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(user),
    });

    const signUpStatus = await resp.json();

    if (signUpStatus.success) {
      localStorage.setItem("token", signUpStatus["jwt"]);
      await autoLogin();
    }
  };
}

export { login, logout, autoLogin, createUser };
