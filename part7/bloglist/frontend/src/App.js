import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import Home from "./components/Home";

import { timedMessage } from "./utils";
import { clearUser, setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const errorMessage = useSelector((state) => state.notifications.error);
  const notification = useSelector((state) => state.notifications.notification);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(clearUser());
    timedMessage(dispatch, "You have logged out!", "notification");
  };

  const loggedView = () => (
    <>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );

  return (
    <>
      <Notification message={errorMessage} />
      <Notification message={notification} type="notification" />
      {user === null ? <LoginForm /> : loggedView()}
    </>
  );
};

export default App;
