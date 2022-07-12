import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";

import { timedMessage } from "./utils";
import { clearUser, setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const errorMessage = useSelector((state) => state.notifications.error);
  const notification = useSelector((state) => state.notifications.notification);
  const newBlogFormRef = useRef();

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
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Toggleable buttonLabel="new blog" ref={newBlogFormRef}>
                <BlogForm toggleableRef={newBlogFormRef} />
              </Toggleable>
              <BlogList />
            </>
          }
        />
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
