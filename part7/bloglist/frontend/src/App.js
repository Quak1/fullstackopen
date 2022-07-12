import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import loginService from "./services/login";
import { createBlog } from "./reducers/blogReducer";
import { timedMessage } from "./utils";

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const errorMessage = useSelector((state) => state.notifications.error);
  const notification = useSelector((state) => state.notifications.notification);
  const newBlogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  /* const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    timedMessage(dispatch, "You have logged out!", "notification");
  }; */

  const sendCredentials = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      timedMessage(dispatch, "You have logged in!", "notification");
      return true;
    } catch (exception) {
      timedMessage(dispatch, "Wrong username or password", "error");
    }
  };

  const funcreateBlog = async (blog) => {
    try {
      /* const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog)); */
      dispatch(createBlog(blog));

      /* timedMessage(
        `A new blog ${newBlog.title} by ${newBlog.author} has been added`,
        setNotification
      ); */
      newBlogFormRef.current.toggleVisibility();
      return true;
    } catch (exception) {
      timedMessage(dispatch, "Please fill all the required(*) fields", "error");
    }
  };

  const loggedView = () => (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <Toggleable buttonLabel="new blog" ref={newBlogFormRef}>
        <BlogForm createBlog={funcreateBlog} />
      </Toggleable>
      <BlogList />
    </>
  );

  return (
    <>
      <Notification message={errorMessage} />
      <Notification message={notification} type="notification" />
      {user === null ? (
        <LoginForm sendCredentials={sendCredentials} />
      ) : (
        loggedView()
      )}
    </>
  );
};

export default App;
