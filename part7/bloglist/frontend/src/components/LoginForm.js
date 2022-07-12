import { useState } from "react";
import { useDispatch } from "react-redux";
import { timedMessage } from "../utils";
import loginService from "../services/login";
import { setUser } from "../reducers/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendCredentials = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch(setUser(user));
      timedMessage(dispatch, "You have logged in!", "notification");
      return true;
    } catch (exception) {
      timedMessage(dispatch, "Wrong username or password", "error");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await sendCredentials({ username, password });

    if (res) setUsername("");
    setPassword("");
  };

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
