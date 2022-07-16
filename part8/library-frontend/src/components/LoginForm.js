import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../queries";

const LoginForm = ({ setToken, setPage, show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("token", token);
    }
  }, [result.data]);

  if (!show) return null;

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
    setPage("authors");
  };

  return (
    <form onSubmit={submit}>
      <div>
        username{" "}
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
