import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ sendCredentials }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

LoginForm.propTypes = {
  sendCredentials: PropTypes.func.isRequired,
};

export default LoginForm;
